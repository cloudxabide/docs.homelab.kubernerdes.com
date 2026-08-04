---
id: day-1-build
title: Day 1 - Build
sidebar_position: 1
---

# Day 1 - Build

Standing up the core infrastructure and clusters:

- Build the admin node (DHCP, DNS, PXE)
- Install Harvester
- Update Harvester (add cloud-image, virtual networks, ssh-keys)
- Deploy 3 x VMs (SL-Micro) to install RKE2
- Install Rancher Manager (on RKE2 previously installed)
- Add Harvester to Rancher Manager as a provider
- Deploy Observability cluster and install Observability (StackState)
- Deploy the Apps cluster (then install Security (NeuVector)) — provisions dedicated control-plane and worker node pools
- Deploy sample workloads (chell-test, optional HexGL) to the Apps cluster — chell-test is the prerequisite target for the [Day 2 Security demo](/docs/day-2-operate)

See the source repo's [PLAN.md](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/PLAN.md) for the detailed, checkbox-tracked build steps, and [30_deploy_apps.sh](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/Scripts/30_deploy_apps.sh) for the sample-workload deploy script.
