#!/usr/bin/env bash
set -euo pipefail
# Launches integration tests with a SCRUBBED environment containing only the *_TEST
# credentials, extracted here (shell-side) — test code never reads .env.local, and the
# prod UNIPILE_API_KEY never enters the test process.
cd "$(dirname "$0")/.."
key=$(sed -n 's/^UNIPILE_API_KEY_TEST=//p' .env.local | tail -1)
acc=$(sed -n 's/^UNIPILE_ACCOUNT_ID_TEST=//p' .env.local | tail -1)
base=$(sed -n 's/^UNIPILE_BASE_URL_TEST=//p' .env.local | tail -1)
if [ -z "$key" ] || [ -z "$acc" ]; then
  echo "Missing UNIPILE_API_KEY_TEST / UNIPILE_ACCOUNT_ID_TEST in .env.local" >&2
  exit 1
fi
exec env -i PATH="$PATH" HOME="$HOME" TERM="${TERM:-xterm-256color}" \
  UNIPILE_API_KEY_TEST="$key" \
  UNIPILE_ACCOUNT_ID_TEST="$acc" \
  UNIPILE_BASE_URL_TEST="${base:-https://api.unipile.com}" \
  UNIPILE_TEST_LIVE=1 \
  npm run test:integration
