#!/bin/zsh
set -eu

TOOL_DIR=${0:A:h}
REPO_DIR=${TOOL_DIR:h:h}
EDITOR_URL="http://127.0.0.1:8093/editor.html"
LOG_PATH="/tmp/cysh-hall-tour-editor.log"

cd "$REPO_DIR"
if ! curl -fsS "http://127.0.0.1:8093/api/status" >/dev/null 2>&1; then
  nohup python3 tools/hall-tour-editor/serve.py >"$LOG_PATH" 2>&1 &
  for _attempt in {1..30}; do
    if curl -fsS "http://127.0.0.1:8093/api/status" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

open "$EDITOR_URL"
