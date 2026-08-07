#!/bin/zsh
cd "$(dirname "$0")/../.."
exec python3 tools/hall-tour-scene-calibrator/serve.py
