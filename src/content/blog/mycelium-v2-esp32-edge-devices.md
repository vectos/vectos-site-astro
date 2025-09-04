---
pubDate: "2025-08-21"
banner: "/img/blog/mycelium/esp32-edge.jpg"
title: "Building Low-Power ESP32 Edge Devices for Plant Monitoring"
description: "Deep dive into designing power-efficient IoT sensors with ESP32, BLE communication, and smart sleep strategies"
draft: true
series: "Mycelium v2"
---

## The Edge of Innovation

In the Mycelium v2 ecosystem, edge devices are the sensory organs—small, battery-powered ESP32 modules that live alongside your plants, constantly monitoring their environment. But here's the challenge: these devices need to run for months on a single battery charge while maintaining reliable communication and accurate sensing.

## Why ESP32?

After evaluating several microcontroller options, the ESP32 emerged as the clear winner for our edge peripherals:

### Built-in Connectivity

- **Bluetooth Low Energy (BLE)**: Perfect for low-power, short-range communication with our central hub
- **Wi-Fi capability**: Available for future enhancements without hardware changes
- **Dual-core architecture**: Allows separation of sensor tasks and communication protocols

### Power Management

- **Deep sleep modes**: Current consumption drops to just 10µA in deep sleep
- **Wake-up sources**: Multiple options including timer, GPIO, and touch wake-up
- **Dynamic frequency scaling**: Adjust CPU speed based on workload

### Development Ecosystem

- **Arduino IDE support**: Rapid prototyping and familiar development environment
- **Rich library ecosystem**: Extensive sensor and communication libraries
- **Active community**: Abundant resources and troubleshooting support

## Sensor Selection and Integration

### Soil Moisture Sensing

We chose capacitive soil moisture sensors over resistive ones to avoid electrode corrosion. The sensors provide analog readings that we calibrate against known moisture levels:

```cpp
// Calibrated moisture reading
int getMoisturePercentage() {
    int rawValue = analogRead(MOISTURE_PIN);
    // Map raw ADC value to percentage (calibrated values)
    return map(rawValue, DRY_VALUE, WET_VALUE, 0, 100);
}
```

### Light Level Monitoring

A simple photoresistor provides adequate light level detection for most indoor plants. We use a voltage divider circuit and sample multiple readings to account for fluctuations:

```cpp
int getLightLevel() {
    int total = 0;
    for(int i = 0; i < 10; i++) {
        total += analogRead(LIGHT_PIN);
        delay(10);
    }
    return total / 10; // Average of 10 readings
}
```

### Environmental Sensing

The DHT22 sensor handles both temperature and humidity monitoring with good accuracy for plant care applications.

### Battery Monitoring

Critical for maintenance scheduling, we monitor battery voltage through a voltage divider:

```cpp
float getBatteryVoltage() {
    int rawValue = analogRead(BATTERY_PIN);
    // Convert ADC reading to actual voltage
    return (rawValue * 3.3 / 4095.0) * 2.0; // Account for voltage divider
}
```

## Firmware Architecture

### State Machine Design

The firmware operates as a state machine with three primary states:

1. **SLEEP**: Deep sleep mode, minimal power consumption
2. **SENSE**: Wake up, collect sensor data, prepare for transmission
3. **TRANSMIT**: Establish BLE connection, send data, receive commands

### Power Optimization Tactics

#### Smart Sleep Scheduling

Instead of fixed intervals, we use adaptive sleep periods based on plant needs and battery level:

```cpp
unsigned long calculateSleepDuration() {
    unsigned long baseSleep = 30 * 60 * 1000000; // 30 minutes in microseconds

    // Extend sleep if battery is low
    if(batteryVoltage < LOW_BATTERY_THRESHOLD) {
        baseSleep *= 2;
    }

    // Shorter intervals during critical periods
    if(moistureLevel < CRITICAL_MOISTURE) {
        baseSleep /= 2;
    }

    return baseSleep;
}
```

#### Efficient BLE Communication

We minimize connection time by preparing all data before initiating BLE connection:

```cpp
void transmitData() {
    // Prepare data packet while radio is off
    SensorData data = {
        .moisture = getMoisturePercentage(),
        .light = getLightLevel(),
        .temperature = dht.readTemperature(),
        .humidity = dht.readHumidity(),
        .battery = getBatteryVoltage(),
        .timestamp = getLocalTime()
    };

    // Quick BLE transmission
    bleTransmit(data);

    // Immediately return to sleep
    enterDeepSleep();
}
```

## Prototype Challenges and Lessons Learned

### Challenge 1: Inconsistent Sensor Readings

**Problem**: Soil moisture readings varied wildly between identical sensors.
**Solution**: Individual calibration for each sensor and averaging multiple readings over time.

### Challenge 2: BLE Connection Reliability

**Problem**: Intermittent connection failures, especially at range limits.
**Solution**: Implemented retry logic with exponential backoff and connection quality monitoring.

### Challenge 3: Power Consumption Higher Than Expected

**Problem**: Initial prototypes lasted only weeks instead of months.
**Solution**: Discovered GPIO leakage current. Added explicit pin configuration before sleep:

```cpp
void prepareForSleep() {
    // Configure all unused pins as inputs with pullup
    for(int i = 0; i < 40; i++) {
        if(!isPinUsed(i)) {
            pinMode(i, INPUT_PULLUP);
        }
    }

    // Disable unnecessary peripherals
    WiFi.mode(WIFI_OFF);
    btStop();
}
```

### Challenge 4: Time Synchronization

**Problem**: Without RTC, timestamps were unreliable after deep sleep.
**Solution**: Implemented time sync with central hub during each communication cycle.

## Performance Results

After optimization, our edge devices achieve:

- **Battery life**: 4-6 months on a single 18650 battery
- **Communication range**: 15-20 meters indoors
- **Sensor accuracy**: ±2% for moisture, ±1°C for temperature
- **Data transmission**: <5 seconds from wake to sleep

## Next Steps

In the next post, we'll explore how these edge devices communicate with the central hub through our custom TLV protocol, and how we handle the challenges of BLE reliability in a multi-device environment.

The edge devices are just the beginning—they're the foundation that makes the entire Mycelium v2 ecosystem possible.
