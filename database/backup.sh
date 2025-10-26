#!/bin/bash
set -e

# Configuration
BACKUP_DIR="/backup"
POSTGRES_DB="nourishnet"
BACKUP_RETAIN_DAYS=7
POSTGRES_HOST="db"
POSTGRES_USER="postgres"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Create backup
BACKUP_FILE="${BACKUP_DIR}/db_backup_$(date +%Y%m%d_%H%M%S).sql"
pg_dump -h ${POSTGRES_HOST} -U ${POSTGRES_USER} ${POSTGRES_DB} > ${BACKUP_FILE}
gzip ${BACKUP_FILE}

# Delete old backups
find ${BACKUP_DIR} -type f -mtime +${BACKUP_RETAIN_DAYS} -delete

# Log backup completion
echo "Backup completed: $(date)"