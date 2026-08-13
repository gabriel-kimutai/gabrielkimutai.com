---
title: "Plutus"
description: "An Android application for tracking and reconciling financial transactions using notification capture and local processing."
date: 2026-06-01
weight: 2
draft: false
tags:
  - Kotlin
  - Android
  - Jetpack Compose
  - Room
categories:
  - Mobile
problem: "Reconcile personal financial activity on-device from transaction notifications without sending private data to a remote backend."
technologies:
  - Kotlin
  - Jetpack Compose
  - Room
  - WorkManager
  - Koin
  - Local ML / embeddings
github: "https://github.com/gabriel-kimutai"
featured: true
---

<div class="project-meta">
<dl>
<dt>Problem</dt>
<dd>Track and reconcile financial transactions on Android using notification signals and local processing — without exposing private financial data.</dd>
<dt>Stack</dt>
<dd>
<ul class="tech-list">
<li>Kotlin</li>
<li>Jetpack Compose</li>
<li>Room</li>
<li>WorkManager</li>
<li>Koin</li>
<li>Local ML / embeddings</li>
</ul>
</dd>
</dl>
</div>

## Overview

Plutus is an Android application for tracking and reconciling financial transactions. It focuses on **transaction parsing**, **local processing**, and **automation** rather than a cloud-hosted finance product.

The design center is on-device: notifications and local storage drive the workflow so sensitive financial detail stays under the user's control.

## Problem

Transaction records often arrive as noisy notification text. Turning that into structured history requires:

- reliable parsing of heterogeneous message formats
- durable local storage and reconciliation
- background work that stays correct when the app is not open
- categorization that does not depend on shipping raw statements to a server

## Architecture

```goat
+---------------------------+
|     Notification Feed     |
+-------------+-------------+
              |
              v
+---------------------------+
|     Parsing Pipeline      |
+-------------+-------------+
              |
              v
+---------------------------+
|   Local Data Model (Room) |
+------+-------------+------+
       |             |
       v             v
+------------+  +------------------+
|   UI       |  | Background work  |
|  Compose   |  |  WorkManager     |
+------------+  +------------------+
```

## Implementation

- **Kotlin + Jetpack Compose** for the application UI
- **Room** for structured local persistence
- **WorkManager** for deferred and periodic reconciliation tasks
- **Koin** for dependency injection
- **Local ML / embeddings** to support on-device categorization and similarity-style matching without remote inference

The engineering emphasis is data modeling and parsing reliability, not flashy charts.

## Engineering Decisions

- Prefer local processing for privacy-sensitive financial content
- Treat notifications as an input stream that must be normalized into a schema
- Keep background automation explicit and inspectable via WorkManager
- Use embeddings locally where fuzzy matching helps reconciliation

## Challenges

- Notification text is inconsistent across senders
- Reconciliation must tolerate duplicates, partial updates, and delayed messages
- On-device ML has to stay lightweight enough for ordinary phones
- No confidential implementation details or private financial samples are documented here

## Technology

| Area | Tools |
| --- | --- |
| UI | Kotlin, Jetpack Compose |
| Persistence | Room |
| Automation | WorkManager |
| Architecture | Koin |
| On-device intelligence | Local ML / embeddings |

## Results

Plutus demonstrates mobile systems work beyond CRUD screens: ingestion, parsing, local data modeling, and automated reconciliation on Android.

## Links

- [GitHub](https://github.com/gabriel-kimutai)
- [Work]({{< ref "/work" >}})
