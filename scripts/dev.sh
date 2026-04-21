#!/usr/bin/env sh
# Starts the local MindMap Care stack with Docker Compose.
# Run from the repository root:
#   ./scripts/dev.sh

set -eu

docker compose up --build
