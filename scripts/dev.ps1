# Starts the local MindMap Care stack with Docker Compose.
# Run from the repository root:
#   .\scripts\dev.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

docker compose up --build
