---
id: deep-dives
title: Deep Dives
sidebar_position: 1
---

# Deep Dives

Background reading and narrower technical write-ups that support the Day 0-2 guides but don't belong in the step-by-step flow.

- [Product Overview](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/Product_Overview.md) — what each product in the stack is, why it's here, and links to further content (Harvester, Rancher Manager, NeuVector, StackState, SLE/SL-Micro, RKE2/K3s, Hauler, Harbor)
- [Air-gapped Kubernetes & Containers Quick Guide](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/DeepDive/Airgap_Overview.md) — mirroring images and Helm charts into Harbor, updating registry references, and the cutover checklist for the `enclave` environment
- [Harvester Load Balancer](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/DeepDive/Load_Balancer-Harvester.md) — how IP pools, listeners, and backend server selectors are set up for the Rancher Manager, Observability, and Apps clusters
- [Security Discussion](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/DeepDive/Security_Discussion.md) — how attackers pivot against shell-less/distroless containers, and how NeuVector's Zero Trust behavioral baselining still catches it

See the source repo's [DeepDive/](https://github.com/cloudxabide/homelab.kubernerdes.com/tree/main/DeepDive) directory for the latest.
