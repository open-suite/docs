---
sidebar_position: 3
---
# Backups

Three things hold all state: the **Postgres** databases, the **Nextcloud /
MinIO** object storage, and the **k3s** cluster config. Back up all three.

## Databases

Dump each app's Postgres database from its pod:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl -n mb-nextcloud exec deploy/nextcloud-postgresql -- \
  pg_dumpall -U postgres | gzip > nextcloud-$(date +%F).sql.gz
```

Repeat for other namespaces that own a database (`mb-docs`, `mb-keycloak`, …).

## Files (MinIO / object storage)

Mirror the Nextcloud bucket out with the MinIO client:

```bash
mc mirror minio/nextcloud /backup/nextcloud-data
```

## Cluster state

Back up `/etc/rancher/k3s/` and the open-suite repo checkout (it holds the deploy
scripts, patches, and overlays). With those plus the dumps above, a wiped box can
be rebuilt by re-running `deploy.sh` and restoring data.

## Schedule

Run the dumps from cron daily and copy them off-box (e.g. to S3-compatible
storage in the EU). Test a restore periodically.
