---
title: "Engineering"
description: "Areas of work — backend, mobile, networking, infrastructure — connected to real projects."
---

Technologies matter when they are attached to systems. Below is how the stack maps to actual work, not a scorecard.

## Backend Engineering

Go · APIs · PostgreSQL · distributed / event-driven services

Used in [Pakua]({{< ref "/work/pakua" >}}) and [event / payment systems]({{< ref "/work/event-payment-systems" >}}) for APIs, data modeling, integrations, and service boundaries.

## Mobile

Android · Kotlin · Jetpack Compose

Used in [Heimdall]({{< ref "/work/heimdall" >}}) (management client) and [Plutus]({{< ref "/work/plutus" >}}) (local transaction workflows).

## Networking

UDP · mDNS · WebSockets · SSE · service discovery

Used in Heimdall for LAN discovery and control, and in marketplace / event systems for realtime C2C and live updates.

## Infrastructure

Docker · Linux · CI/CD · AWS · observability

Used across deployment and operations work — including AWS migration and CI/CD automation in current professional roles — and Linux/systemd packaging concerns for daemon-style services like Heimdall.

---

## Engineering philosophy

Short principles that guide implementation choices:

- Prefer simple systems over unnecessary abstraction
- Keep interfaces explicit
- Design APIs for reliability, not novelty
- Make services observable
- Treat security as part of the design, not a final coat of paint
- Automate the paths that otherwise rot
- Test the behavior that would be expensive to learn in production
- Prefer measurable decisions over taste arguments when the data exists

The goal is software that can be operated, debugged, and extended — not demos that only work on one laptop.
