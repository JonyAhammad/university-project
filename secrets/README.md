# Secrets & Docker Secrets (local examples)

This file explains how to create Docker secret files for local development and which GitHub Actions secrets the CI expects.

Create secret files locally (PowerShell):

```powershell
# create directory for example secrets
mkdir .\secrets

# write secret files (replace the sample values with real secrets)
"my-db-password" | Out-File -Encoding ASCII .\secrets\db_password
"my-redis-password" | Out-File -Encoding ASCII .\secrets\redis_password
"my-email-password" | Out-File -Encoding ASCII .\secrets\email_pass
```

Usage with `docker-compose.prod.yml`:

- The compose file mounts those files as Docker secrets into `/run/secrets/<name>` inside the container.
- The backend image uses an entrypoint that reads environment variables that end with `_FILE` and exports the underlying value as the corresponding variable without `_FILE`.

For example, if the compose sets `POSTGRES_PASSWORD_FILE=/run/secrets/db_password`, the entrypoint will read that file and export `POSTGRES_PASSWORD` with the file contents before starting the app.

GitHub Actions secrets (to enable optional image push):

- `DOCKER_REGISTRY_USERNAME` - username or GHCR login
- `DOCKER_REGISTRY_PASSWORD` - token/password

Notes

- Do NOT commit real secret values into the repository.
- For production, prefer a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) or Docker Swarm/Kubernetes secrets.
