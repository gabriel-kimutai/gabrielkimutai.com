---
title: "Pakua"
description: "A marketplace and listing platform with Go APIs, real-time C2C messaging, and PostgreSQL-backed inventory."
date: 2025-09-01
weight: 3
draft: false
tags:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - WebSockets
categories:
  - Backend
problem: "Support marketplace listings, inventory, and real-time customer-to-customer communication on a coherent backend."
technologies:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - JSONB
  - WebSockets
  - Docker
github: "https://github.com/gabriel-kimutai"
featured: true
---

<div class="project-meta">
<dl>
<dt>Problem</dt>
<dd>Build marketplace listing and inventory flows with reliable APIs and real-time customer-to-customer communication.</dd>
<dt>Stack</dt>
<dd>
<ul class="tech-list">
<li>Go</li>
<li>React</li>
<li>TypeScript</li>
<li>PostgreSQL</li>
<li>JSONB</li>
<li>WebSockets</li>
<li>Docker</li>
</ul>
</dd>
</dl>
</div>

## Overview

Pakua is a marketplace / listing platform. The engineering focus is the **backend architecture**: APIs, inventory modeling, and real-time C2C messaging — with a React/TypeScript client on top.

This page describes the systems shape of the work. It does not invent user counts, revenue, or confidential product metrics.

## Problem

A marketplace needs more than static listings:

- consistent APIs for create/update/search flows
- inventory state that stays coherent as listings change
- direct communication between customers without turning the app into an email client
- data models flexible enough for listing attributes without an unmaintainable schema explosion

## Architecture

```goat
+------------------+          +------------------+
|  React / TS UI   | <------> |     Go APIs      |
+------------------+          +--------+---------+
                                       |
                         +-------------+-------------+
                         |                           |
                         v                           v
                 +---------------+           +---------------+
                 |  PostgreSQL   |           |  WebSockets   |
                 |  + JSONB      |           |  C2C messaging|
                 +---------------+           +---------------+
```

## Implementation

- **Go** services for HTTP APIs and domain logic
- **PostgreSQL** with **JSONB** for structured listing attributes that still need relational integrity around inventory and identity
- **WebSockets** for real-time customer-to-customer communication
- **React + TypeScript** for the product UI
- **Docker** for reproducible local and deployed environments

## Engineering Decisions

- Keep listing flexibility in JSONB while anchoring critical inventory and identity data in relational columns
- Treat messaging as a first-class realtime path rather than polling
- Prefer explicit API boundaries between client and backend
- Use containers so the platform stack stays portable across environments

## Challenges

- Modeling inventory so listing updates do not drift from availability
- Keeping websocket sessions reliable alongside ordinary request/response APIs
- Balancing schema flexibility (JSONB) with queryability and constraints

## Technology

| Layer | Choices |
| --- | --- |
| API | Go |
| Client | React, TypeScript |
| Data | PostgreSQL, JSONB |
| Realtime | WebSockets |
| Runtime | Docker |

## Results

Pakua is concrete full-stack platform work: Go APIs, realtime messaging, inventory systems, and a TypeScript client — the same concerns that show up in production marketplace backends.

## Links

- [GitHub](https://github.com/gabriel-kimutai)
- [Work]({{< ref "/work" >}})
