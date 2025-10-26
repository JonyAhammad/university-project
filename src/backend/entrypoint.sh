#!/bin/sh
set -eu
# Entrypoint: load any environment variables that use the *_FILE convention.
# For every environment variable named SOMETHING_FILE=/run/secrets/xxx,
# read the file and export SOMETHING with the file contents.

for kv in $(env); do
  case "$kv" in
    *_FILE=*)
      name=$(printf '%s' "$kv" | sed 's/=.*//; s/_FILE$//')
      file=$(printf '%s' "$kv" | sed 's/^[^=]*=//')
      if [ -n "$file" ] && [ -f "$file" ]; then
        # read file contents (trim trailing newlines)
        value=$(cat "$file" | tr -d '\r')
        export "$name"="$value"
      fi
      ;;
  esac
done

# Optional debug output
if [ "${DEBUG_ENTRYPOINT:-0}" = "1" ]; then
  echo "[entrypoint] environment after loading *_FILE vars:"
  env | grep -E 'POSTGRES|REDIS|EMAIL|JWT|SESSION' || true
fi

# Exec the container CMD
exec "$@"
