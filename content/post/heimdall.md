---

title: "Heimdall: Managing Your Computer From Your Phone"
description: "Building Heimdall, an Android application for discovering and managing computers from a phone."
date: 2026-08-11
draft: true
tags:
    - Android
    - Go
    - Networking
    - mDNS
    - Linux
    - Remote Management

---

## Managing Your Computer From Your Phone

I am building Heimdall, an Android application for managing computers from a phone.

The idea is simple: install a small daemon on a computer, open Heimdall on an Android device, discover the computer on the local network, and control it from the phone.

The project is not intended to be a traditional remote desktop application. The goal is to build a lightweight computer management system with a native Android interface and a small agent running on the computer.

## The Architecture

Heimdall consists of two main components:

```goat
+----------------------+
|      Android App     |
|       Heimdall       |
+----------+-----------+
           |
           | Local Network
           |
           v
+----------------------+
|    Heimdall Agent    |
|     Computer Daemon  |
+----------------------+
```

The Android application is the client.

The computer runs the Heimdall daemon. The daemon exposes the computer's management capabilities through a network protocol.

This separation is important. The Android application should not need to know how Linux, Windows, or macOS performs a particular operation. It only needs to understand the Heimdall protocol.

The daemon handles the platform-specific implementation.

## Service Discovery

The first problem was finding computers on the local network.

I did not want the user to manually enter an IP address. Computers can receive different addresses from DHCP, and asking users to configure IP addresses makes the application unnecessarily difficult to use.

The solution is service discovery.

The computer daemon advertises its presence on the network, while Heimdall searches for available agents.

The flow looks like this:

```goat
                  +----------------+
                  |    Android     |
                  |    Heimdall    |
                  +-------+--------+
                          |
                          | discovery query
                          |
                          v
                  +----------------+
                  | Local Network  |
                  +-------+--------+
                          |
             +------------+------------+
             |            |            |
             v            v            v
        +---------+  +---------+  +-----------+
        |Computer |  |Computer |  |   Other   |
        |    A    |  |    B    |  |  devices  |
        +----+----+  +----+----+  +-----------+
             |            |
             v            v
        +---------+  +---------+
        | Heimdall|  | Heimdall|
        |  Agent  |  |  Agent  |
        +---------+  +---------+
```

The Android application can therefore build a list of available computers without any configuration from the user.

Each discovered computer provides information such as:

```json
{
  "id": "01J...",
  "name": "desktop",
  "platform": "linux",
  "version": "0.1.0",
  "port": 48271
}
```

The discovery layer is intentionally separate from the control protocol.

Discovery answers one question:

> Which Heimdall agents are available?

The control protocol answers a different question:

> What can I do with this computer?

Keeping those responsibilities separate makes the system easier to extend.

## The Computer Agent

The computer side of Heimdall is a daemon.

I am implementing the daemon in Go because it needs to perform several tasks that fit well with Go's standard library and concurrency model:

* Network communication
* Service discovery
* Authentication
* Command execution
* System monitoring
* Event streaming
* File operations
* Process management

The daemon is designed around capabilities rather than UI operations.

For example:

```text
system
process
power
network
storage
files
display
audio
```

Each capability can expose several commands.

For example:

```text
system.info
system.stats

process.list
process.inspect
process.kill

power.shutdown
power.reboot
power.sleep
power.lock
```

This gives the Android application a consistent interface.

## A Command-Based Protocol

The control protocol uses messages rather than tying the API directly to HTTP endpoints.

A request can look like:

```json
{
  "type": "request",
  "id": "req_123",
  "method": "system.info",
  "params": {}
}
```

The daemon responds with:

```json
{
  "type": "response",
  "id": "req_123",
  "result": {
    "hostname": "desktop",
    "platform": "linux",
    "architecture": "amd64"
  }
}
```

The request ID allows multiple operations to be active at the same time without depending on request ordering.

It also gives the protocol a clean way to associate responses with requests.

## Events

Not everything should require polling.

A computer management application needs to display information that changes continuously.

CPU usage is a good example.

Instead of having the Android application repeatedly ask:

```text
system.stats
system.stats
system.stats
system.stats
```

the daemon can publish events:

```json
{
  "type": "event",
  "event": "system.stats",
  "data": {
    "cpu": 23.4,
    "memory": 61.2
  }
}
```

This creates a bidirectional connection:

```goat
+-----------+                         +-----------+
|  Android  |                         |   Agent   |
|  Heimdall |                         |  Computer |
+-----+-----+                         +-----+-----+
      |                                     |
      |--------- request ------------------>|
      |<-------- response ------------------|
      |                                     |
      |<--------- event --------------------|
      |                                     |
```

This will also allow the Android application to provide a live system dashboard.

## Security

Remote computer management requires a stronger security model than simply exposing an unauthenticated API on the local network.

The daemon should have its own cryptographic identity.

During initial pairing, the Android application and computer establish trust.

After pairing, the Android application can authenticate the computer and the computer can authenticate the Android device.

The intended model is:

```goat
+-------+                              +----------+
| Phone |                              | Computer |
+---+---+                              +----+-----+
    |                                       |
    |          pairing request              |
    +-------------------------------------->|
    |                                       |
    |          authentication              |
    |<--------------------------------------+
    |                                       |
    |          paired identity              |
    +-------------------------------------->|
    |                                       |
```

After pairing, subsequent connections use the established identity instead of requiring the user to repeatedly enter credentials.

The control connection will also be encrypted.

Discovery itself does not need to carry sensitive information. Its job is only to find available agents. Authentication happens when establishing the control connection.

## Platform Independence

One of the reasons for making the daemon separate from the Android client is future platform support.

The protocol can remain the same while the implementation changes:

```goat
                         +----------------------+
                         |   Heimdall Protocol  |
                         +----------+-----------+
                                    |
                  +-----------------+-----------------+
                  |                 |                 |
                  v                 v                 v
             +---------+       +---------+       +---------+
             |  Linux  |       | Windows |       |  macOS  |
             +----+----+       +----+----+       +----+----+
                  |                 |                 |
                  v                 v                 v
             +---------+       +---------+       +---------+
             |  Linux  |       | Windows |       |  macOS  |
             |  Agent  |       |  Agent  |       |  Agent  |
             +---------+       +---------+       +---------+
```

For example, `power.shutdown` means the same thing to the Android application regardless of the operating system.

The daemon translates that command into the appropriate platform operation.

This also means the Android application does not need platform-specific code for every computer feature.

## The Initial Feature Set

The first version will focus on basic computer management rather than attempting to build everything at once.

The initial capabilities are:

```text
System
 ├─System information
 ├─CPU usage
 ├─Memory usage
 └─Disk usage
Processes
 ├─List processes
 ├─Inspect process
 └─Terminate process
Power
 ├─Shutdown
 ├─Restart
 ├─Sleep
 └─Lock
```

Once these are stable, additional capabilities can be added without changing the overall architecture.

Potential future functionality includes:

```text
Network monitoring
File management
Application launching
Display control
Audio control
Docker management
Service management
Terminal access
Resource monitoring
```

## Why Build This?

There are already many tools for remotely controlling computers.

That is not really the point of Heimdall.

I want a system that is designed around computer management rather than remote desktop interaction.

A phone is a good interface for actions such as:

```text
Is my computer running?

How much CPU is it using?

Is a process consuming too much memory?

Restart the machine.

Lock the workstation.

Check disk usage.

Start an application.

Check whether a service is running.
```

These operations do not require streaming the entire desktop to a phone.

A small agent and a small protocol are enough.

## The Goal

The long-term goal is for Heimdall to become a general-purpose computer management platform.

The Android application provides the user interface.

The daemon provides access to the computer.

The protocol connects the two.

The important part is that each layer remains independent:

```goat
+---------------------------+
|       Heimdall App        |
|      Android / Kotlin     |
+-------------+-------------+
              |
              | Heimdall Protocol
              |
+-------------v-------------+
|       Heimdall Agent      |
|            Go             |
+-------------+-------------+
              |
              |
        +-----+-----+
        |           |
        v           v
+---------------+ +---------------+
|   Platform    | |   Platform    |
|   Services    | |     APIs      |
+---------------+ +---------------+
```

The first milestone is simple: discover a computer, establish a trusted connection, and perform a small number of useful operations.

Everything else can build on top of that foundation.

Heimdall is still in development, but the core architecture is now taking shape around one principle:

**Your computer should be manageable from anywhere you already have a screen.**
