---
id: getting-started
title: Getting Started
sidebar_position: 1
---

# Getting Started

This guide tracks the [homelab.kubernerdes.com](https://github.com/cloudxabide/homelab.kubernerdes.com) repo — a lab/demo environment showcasing SUSE infrastructure and cloud-native software, along with guidance on how to deploy it.

## Deployment Modes

The environment supports three deployment modes, selected via `ENVIRONMENT`:

| ENVIRONMENT | CIDR | Purpose |
|:------------|:-----|:--------|
| homelab | 10.10.12.0/22 | Supernet for the lab — shared infra services (DHCP, DNS, PXE, etc.) |
| enclave | 10.10.13.0/24 | Air-gapped deployment using SUSE Prime and Hauler |
| community | 10.10.14.0/24 | Deployment using community bits |
| prime | 10.10.15.0/24 | Deployment using bits from the SUSE Prime registry/repo |

## Tech Stack

- SUSE Virtualization (Harvester)
- SUSE Rancher Manager
- SUSE Security (NeuVector)
- SUSE Observability (StackState)
- SUSE Linux Enterprise (SLE/SLES) / SUSE Linux Enterprise Micro (SL-Micro)
- SUSE RKE2 (K3s when needed)
- RGS Hauler
- Harbor

## Guide Structure

- **[Day 0 - Plan](/docs/day-0-plan)** — planning and architecture
- **[Day 1 - Build](/docs/day-1-build)** — install Harvester, Rancher Manager, the Apps cluster (with Security), and Observability
- **[Day 2 - Operate](/docs/day-2-operate)** — backups, RBAC, and ongoing operations
