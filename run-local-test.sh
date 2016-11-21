#!/bin/sh

FILENAME=~/Projects/miner/sources.sqlite3

set -ex

redis-cli FLUSHDB >/dev/null
bin/find-strings "$FILENAME"

redis-cli ZRANGE saw_grammar 0 -1 WITHSCORES
redis-cli KEYS 'grammar:*'

set +x
echo "Total files: $(redis-cli GET num_files)"
