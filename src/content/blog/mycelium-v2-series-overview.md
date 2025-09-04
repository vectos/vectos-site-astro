---
pubDate: "2025-08-19"
banner: "/img/blog/mycelium/logo-mycelium.jpg"
title: "Introducing Mycelium v2: A smarter way to water and monitor plants"
description: "An IoT-based plant-monitoring ecosystem"
draft: false
---

## What is Mycelium v2?

Mycelium v2 is an end-to-end IoT ecosystem designed to monitor plant health through a network of smart sensors and centralized data processing. Think of it as a nervous system for your garden—sensors act as nerve endings, collecting vital data about soil moisture, light levels, and environmental conditions, while a central hub processes this information and presents actionable insights through a desktop application.

### Who is building Mycelium?

My brother (Hans de Jong) is an expert in embedded systems. From analog, PCB to firmware development he can do it! He has designed and produced the PCB and soil moisture sensor and wrote the first firmware in C++.

I've done the work on cloud backend, infrastructure and frontend application and I'm also involved now in to the development of the firmware and edge central application.

### What has changed since version 1?

We've altered the edge architecture. In version 1 we had the edge peripheral directly connecting via WiFi to the cloud backend. This involved complex WiFi and auth0/device code onboarding via BLE. Also the big issue there was using HTTP + TLS. HTTP isn't that heavy, but encryption is pretty heavy for an ESP32 and the micro controller was not suitable for this setup. Other companies like Philips Hue and Tado are also using with a hub (central) architecture which is more power efficient.

Also we rewrote the edge peripheral firmware in Rust using `no_std`. We are also reusing

## High-Level Architecture

The Mycelium v2 ecosystem follows a clean data flow:

```
Edge peripherals → Edge central hub → Cloud Backend → Desktop App
```

- **Edge Peripherals**: Low-power ESP32 peripherals with sensors for soil moisture, light, humidity, and battery monitoring. Next to it we would like to install a pump which could automatically water your plants
- **Central Hub**: Rust-based coordinator that manages sensor communication and data synchronization
- **Backend**: Scala-based cloud services with Timescale (PostgreSQL) storage and REST APIs
- **Desktop App**: Cross-platform Tauri application (Rust + React + TypeScript) for data visualization and plant management

## What to Expect in This Series

Over the next six posts, we'll dive deep into each component of the Mycelium v2 system:

1. **The build system using** - Setting up CI/CD for a poly language project
2. **Building Low-Power ESP32 Edge Devices** - Hardware design, sensor integration, and power optimization
3. **Edge communication** - Bluetooth Low Energy communiction on the edge, using a binary format
4. **Cloud Component: Scala Backend & REST API Integration** - Backend implementation considerations
5. **Crafting a Cross-Platform UI with Tauri** - Desktop application development and UX design
6. **End-to-End Flow & System Integration** - Bringing all components together
7. **Challenges, Learnings, and Road Ahead** - Retrospective and future enhancements

Each post will include practical code examples, architectural decisions, challenges faced, and lessons learned. Whether you're interested in IoT development, system architecture, or just curious about building connected plant monitoring systems, this series has something for you.

Ready to grow smarter? Let's dig in.
