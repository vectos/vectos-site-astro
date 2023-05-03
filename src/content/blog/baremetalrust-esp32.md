---
pubDate: "2023-05-03"
banner: "/img/blog/esp32.jpeg"
title: "Using bare metal Rust on ESP32"
description: "Using bare metal Rust on a ESP32 microcontroller"
---

## What is ESP32?

ESP32 is a low-cost, low-power system-on-a-chip (SoC) microcontroller that is designed for embedded applications, such as Internet of Things (IoT) devices, sensors, and controllers. It was developed by Espressif Systems, a Chinese semiconductor company.

The ESP32 is based on a dual-core 32-bit processor that operates at up to 240 MHz, and it includes built-in Wi-Fi and Bluetooth connectivity, making it an ideal choice for projects that require wireless communication. The chip also includes a variety of peripherals, such as digital and analog inputs and outputs, SPI and I2C interfaces, and pulse width modulation (PWM) outputs.

The ESP32 is highly versatile and can be programmed using a variety of languages, including C++, Python, Rust, and Lua, and it supports development frameworks such as the Arduino IDE and the Espressif IoT Development Framework (ESP-IDF). This makes it easy for developers to get started with the platform and quickly prototype and deploy their projects.

## What is Rust?

Rust is a systems programming language that was first released in 2010 by Mozilla Research. It is designed to be fast, reliable, and safe, with a focus on preventing programming errors that can lead to crashes or security vulnerabilities.

Rust is a compiled language that offers low-level control over system resources, making it ideal for applications that require high performance and low-level access to hardware. At the same time, Rust includes features that help developers write safer and more secure code, such as memory safety guarantees, thread safety, and type safety.

One of the key features of Rust is its ownership model, which allows the language to prevent certain types of bugs that commonly occur in C and C++ programs, such as null pointer dereferences and data races. Rust achieves this by enforcing strict rules about how memory is allocated and accessed, which can be initially challenging for developers who are used to more permissive languages.

Rust also includes modern language features such as pattern matching, closures, and functional programming constructs, which make it a pleasure to work with and can help developers write more concise and expressive code.

## What is bare metal?

Bare metal programming is often used in embedded systems, where the hardware is designed for a specific application and there is no need for a full operating system. For example, a microcontroller used in a traffic light system or a smart thermostat may be programmed using bare metal techniques.

This is something different opposed to ESP-IDF, where a lot of stuff is already included like a MQTT client, HTTP server, TCP stack, WiFi etcetera. This might be needed, but it also creates overhead.

## Motivation

Why would we run Rust while we have C++/Arduino?

1. Performance: Rust is a compiled language that produces efficient machine code, making it a good choice for systems with limited resources like the ESP32.
2. Memory safety: Rust has a unique ownership and borrowing system that ensures memory safety at compile time, which means you are less likely to introduce memory bugs like buffer overflows, null pointer dereferences, and use-after-free errors.
3. Expressive type system: Rust has no `null`, but `Option<T>` instead and for error it's uses `Result<T, E>` opposed to throwing exceptions in languages like C or C++. Aswell it has support for discriminated unions (also known as algebraic data types in other languages) which allows you to model more complex models.
4. Concurrency: Rust has built-in support for concurrency and parallelism, which can be useful for programming microcontrollers like the ESP32 that need to handle multiple tasks simultaneously. A good example is the [embassy](https://embassy.dev/) framework. Tasks get transformed at compile time into state machines that get run cooperatively. It requires no dynamic memory allocation, and runs on a single stack, so no per-task stack size tuning is required. It obsoletes the need for a traditional RTOS with kernel context switching, and is faster and smaller than one!

## Getting started

1. Install espup cargo install espup and after that get the a rustc version for esp32 espup install
2. Install espflash `cargo install espflash`
3. Make sure to run `. /Users/{home_dir}/export-esp.sh` when you open a new terminal
4. Use `cargo espflash flash` to flash the device
5. Use `cargo espflash monitor` to see the serial output

### espup
The `espup` is a tool for installing and maintaining the required toolchains for developing applications in Rust for Espressif SoC's`.

### espflash
Serial flasher utilities for Espressif devices, based loosely on esptool.py.

## Our first project

### i2c devices

Writing our own driver for AGS02MA

```rust
static CRC8_SEED: u8 = 0xffu8;
static CRC8_POLYNOMIAL: u8 = 0x31u8;

pub struct Ags02ma<I2C, D> {
    pub i2c: I2C,
    pub delay: D
}

#[derive(Debug)]
pub enum Ags02maError {
    BusWriteError,
    BusReadError,
    CrcError { expected: u8, actual: u8 }
}


impl <I2C, D> Ags02ma<I2C, D> where I2C : Read + Write, D : DelayMs<u16> {
    pub fn read_gas(&mut self) -> Result<u32, Ags02maError> {
        let res = self.execute(1500, &[0x20])?;
        Ok(res * 100)
    }

    pub fn read_tvoc(&mut self) -> Result<u32, Ags02maError> {
        let res = self.execute(1500, &[0x00])?;
        Ok(res & 0xffffff)
    }

    fn execute(&mut self, delay_ms: u16, cmd: &[u8]) -> Result<u32, Ags02maError> {
        lazy_static! {
            static ref CRC: CrcAlgo<u8> = CrcAlgo::<u8>::new(CRC8_POLYNOMIAL, 8, CRC8_SEED, 0x00, false);
        }

        let mut buf = [0u8; 5];
        self.i2c.write(0x1a, cmd).map_err(|_| Ags02maError::BusWriteError)?;
        self.delay.delay_ms(delay_ms);
        self.i2c.read(0x1a, &mut buf).map_err(|_| Ags02maError::BusReadError)?;

        let crc = &mut 0u8;
        CRC.init_crc(crc);
        let crc_res = CRC.update_crc(crc, &buf[0..4]);
        if crc_res != buf[4] {
            return Err(Ags02maError::CrcError { expected: buf[4], actual: crc_res });
        }

        let mut temp: u32 = buf[0] as u32;
        temp <<= 8;
        temp |= buf[1] as u32;
        temp <<= 8;
        temp |= buf[2] as u32;
        temp <<= 8;
        temp |= buf[3] as u32;

        return Ok(temp);
    }
}
```

## Debugging signals

Saleae Logic Analyzer is a popular brand of logic analyzer that is widely used by electronics engineers and hobbyists for digital signal analysis and debugging. It is a small and portable device that connects to a computer via USB, and it can capture and analyze digital signals from various sources such as microcontrollers, sensors, and communication buses.

The Saleae Logic Analyzer comes with a software application that provides a user-friendly interface for setting up and controlling the device. The software allows users to configure the device to capture and display digital signals, and also provides advanced features such as protocol decoding, triggering, and data exporting.

One of the key features of the Saleae Logic Analyzer is its ability to decode a wide range of digital protocols, including I2C, SPI, UART, CAN, LIN, and many others. This makes it a powerful tool for debugging and reverse engineering digital systems.

In addition to the standard logic analyzer functionality, the Saleae Logic Analyzer also includes features such as analog signal capture, frequency measurement, and pulse width measurement, which makes it a versatile tool for a variety of digital and analog signal analysis tasks.

## Conclusion

...
