# Run locally (Windows PowerShell)

This document contains concise Windows PowerShell commands and tips to run the project locally.

1. Create example secret files (safe, local):

```powershell
# create a folder to hold example secret files (do not commit real secrets)
mkdir .\secrets

# write secret values (replace with your real values when appropriate)
"my-db-password" | Out-File -Encoding ASCII .\secrets\db_password
"my-redis-password" | Out-File -Encoding ASCII .\secrets\redis_password
"my-email-password" | Out-File -Encoding ASCII .\secrets\email_pass
```

2. Quick compose up (uses the provided `db-init` to create and seed the test DB):

```powershell
# build & start the stack
docker-compose up --build -d
# view logs for a service (e.g., backend)
docker-compose logs -f backend
docker-compose down
# stop the stack
docker-compose down
```

Optional: view MailHog UI to inspect captured emails:

```powershell
# MailHog web UI will be available at http://localhost:8025
start http://localhost:8025
```

3. Run the backend locally without Docker (developer flow):

```powershell
cd .\src\backend
# install deps if needed
npm ci
# run in dev mode (uses local .env)
npm run dev
```

4. Run tests locally

```powershell
# Backend tests
cd .\src\backend
npm test

# Frontend tests
cd ..\frontend
npm test
```

Notes

- The backend image entrypoint automatically reads any `*_FILE` environment variables (for example, `POSTGRES_PASSWORD_FILE=/run/secrets/db_password`) and exports the corresponding variable without `_FILE` before starting the app. This allows Docker secrets to be used without changing app code.
- If `npm run dev` fails, check `src/backend/.env` or the root `.env` for missing variables and ensure you created example secrets if running with Docker.
- Use `docker-compose logs -f <service>` to inspect container logs.
