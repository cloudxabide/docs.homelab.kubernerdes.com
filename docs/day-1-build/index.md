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

For the reasoning behind the Harvester load-balancer setup used by the Rancher Manager, Observability, and Apps clusters (IP pools, listeners, backend server selectors), see [Harvester Load Balancer](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/DeepDive/Load_Balancer-Harvester.md) in [Deep Dives](/docs/deep-dives).

## Harvester storage network

Longhorn replication traffic runs on its own NIC, separate from Harvester management and VM traffic. Management and VMs use the onboard NIC (the built-in `mgmt` cluster network). Longhorn uses a USB NIC on each node, on a tagged VLAN.

[07_post_configure_harvester.sh](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/Scripts/07_post_configure_harvester.sh) builds all of this. Its values come from the environment file (for example, [env.d/community.sh](https://github.com/cloudxabide/homelab.kubernerdes.com/blob/main/Scripts/env.d/community.sh)). If an environment does not set `STORAGE_NETWORK_VLAN`, the script skips the storage network.

### What gets built

| Object | Community value | Notes |
|:-------|:----------------|:------|
| Node label | `homelab.kubernerdes.com/nuc-gen=gen10` (nuc-01–03), `gen13` (nuc-04–06) | Groups nodes by hardware model |
| ClusterNetwork | `storage` | |
| VlanConfig | `strg-gen10` → `enp0s20f0u4`, `strg-gen13` → `enp0s13f0u1` | One per model, because the USB NIC name differs by model |
| `storage-network` setting | `{"vlan":128,"clusterNetwork":"storage","range":"192.168.128.0/24"}` | The range stays clear of `172.16.0.0/12` |

The VLAN configs select nodes by the `nuc-gen` label, not by role. Role labels can change when Harvester promotes a node.

### Before you start

- **Cable consistently.** Put each USB adapter in the same port on every NUC of the same model. Linux names the interface after the USB port (`...u4`, `...u1`). If you move an adapter, the interface gets a new name and the VLAN config stops matching it.
- **Set it up before any workloads.** Harvester only applies the storage network setting when no Longhorn volume is attached. Run the script right after the cluster is up, before you create any VMs or volumes. On v1.8, the `rancher-monitoring` add-on is enabled by default and holds volumes, so the script turns it off, waits for every volume to detach, applies the setting, then turns monitoring back on. On a cluster that already has VMs, stop them all first.
- **Check the switch.** The switch must pass VLAN-tagged frames for the storage VLAN.

### Verify

```bash
# Setting status should be configured=True, reason=Completed
kubectl get settings.harvesterhci.io storage-network -o yaml

# Each node should have a VlanStatus on the storage cluster network
kubectl get vlanstatus.network.harvesterhci.io

# Each Longhorn instance-manager pod should have an lhnet1 interface with an address in the storage range
kubectl -n longhorn-system get pods -l longhorn.io/component=instance-manager \
  -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{.metadata.annotations.k8s\.v1\.cni\.cncf\.io/network-status}{"\n"}{end}' \
  | grep -E 'instance-manager|lhnet1|192\.168\.'
```

If the `lhnet1` interfaces are missing, or the Longhorn pods don't become Ready, the switch is probably dropping tagged frames. Find this out before any data lands on the cluster. One fix is to connect the USB NICs to a separate switch.
