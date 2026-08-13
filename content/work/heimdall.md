---
title: "Heimdall"
description: "A local-network computer management platform: Android discovery and control of machines through a dedicated Linux daemon."
date: 2026-08-11
weight: 1
draft: false
tags:
  - Go
  - Kotlin
  - Android
  - Networking
  - mDNS
  - Linux
categories:
  - Systems
problem: "Discover and manage computers on a LAN without manual IP configuration or a full remote-desktop stack."
technologies:
  - Go
  - Kotlin
  - Android
  - mDNS
  - UDP
  - Linux
  - systemd
github: "https://github.com/gabriel-kimutai"
featured: true
---

<div class="project-meta">
<dl>
<dt>Problem</dt>
<dd>Discover and remotely manage computers on a local network from an Android device through a small, authenticated agent — not a remote desktop stream.</dd>
<dt>Stack</dt>
<dd>
<ul class="tech-list">
<li>Go</li>
<li>Kotlin</li>
<li>Android</li>
<li>mDNS</li>
<li>UDP</li>
<li>Linux</li>
<li>systemd</li>
</ul>
</dd>
</dl>
</div>

## Overview

Heimdall is a **systems project**: a phone client and a computer daemon connected by a purpose-built protocol.

Install a small daemon on a computer, open Heimdall on Android, discover the machine on the LAN, pair once, then manage the host from the phone.

It is not a traditional remote desktop application. The goal is lightweight computer management — process control, system stats, power actions — with a native Android interface and a small agent on the host.

## Problem

Managing a machine from a phone usually means either:

- typing IP addresses and hoping DHCP does not move them, or
- pulling an entire desktop stream for actions that only need a few commands.

Heimdall targets a different shape of problem: **service discovery + authenticated control** for operational tasks.

## Architecture

```goat
+----------------------+
|      Android App     |
|   Heimdall (Kotlin)  |
+----------+-----------+
           |
           | mDNS discovery
           | authenticated protocol
           v
+----------------------+
|   Heimdall Daemon    |
|         Go           |
+----------+-----------+
           |
     +-----+-----+-----+-----+
     |     |     |     |     |
     v     v     v     v     v
  System Process Network Security Power
```

The Android application is the client. The daemon owns platform-specific work. The client only needs to speak the Heimdall protocol.

```text
Android
   |
   | mDNS
   v
Heimdall Daemon
   |
   +-- System
   +-- Processes
   +-- Network
   +-- Security
```

## Implementation

### Service discovery

The daemon advertises itself on the local network. The phone searches for agents instead of asking the user for an IP address.

```goat
                  +----------------+
                  |    Android     |
                  +-------+--------+
                          |
                          | discovery query
                          v
                  +----------------+
                  | Local Network  |
                  +-------+--------+
                          |
             +------------+------------+
             |            |            |
             v            v            v
        +---------+  +---------+  +-----------+
        | Host A  |  | Host B  |  |   Other   |
        | +Daemon |  | +Daemon |  |  devices  |
        +---------+  +---------+  +-----------+
```

Discovery answers: *which agents are available?*  
The control protocol answers: *what can I do with this host?*

Those responsibilities stay separate so either side can evolve independently.

### Command-based protocol

Control uses request/response messages rather than a large REST surface:

```json
{
  "type": "request",
  "id": "req_123",
  "method": "system.info",
  "params": {}
}
```

Capabilities are grouped by domain:

```text
system.info / system.stats
process.list / process.inspect / process.kill
power.shutdown / power.reboot / power.sleep / power.lock
```

### Events

Live metrics should not require polling. The daemon can publish events such as `system.stats` over a bidirectional connection so the phone can show a live dashboard.

### Security

Remote management needs more than an open LAN socket. The intended model is pairing with cryptographic identity, then authenticated and encrypted control sessions. Discovery stays lightweight; authentication happens when establishing the control connection.

## Engineering Decisions

- **Daemon in Go** for networking, concurrency, and a deployable Linux service.
- **Client in Kotlin/Android** for a native management UI.
- **Capability-oriented API** so the phone stays platform-agnostic.
- **mDNS for discovery** to avoid manual addressing on DHCP networks.
- **Pairing before privilege** so management actions require established trust.

## Challenges

- Keeping discovery simple while keeping control secure
- Designing a protocol that supports concurrent requests and streamed events
- Translating one command set across platform-specific implementations
- Shipping a daemon that fits naturally on Linux (including systemd) without becoming a remote-desktop stack

## Technology

| Layer | Choices |
| --- | --- |
| Client | Android, Kotlin |
| Agent | Go, Linux, systemd |
| Network | mDNS, UDP, authenticated control channel |
| Concerns | service discovery, protocol design, authentication, process/system management |

## Results

Heimdall is in active development. The architecture is organized around a stable foundation: discover a host, establish trust, then perform a small set of useful management operations. Additional capabilities can layer on without rewriting the client/daemon boundary.

## Links

- [GitHub](https://github.com/gabriel-kimutai)
- [Work]({{< ref "/work" >}})
