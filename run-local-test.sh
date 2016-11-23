#!/bin/sh

FILENAME=~/Projects/miner/sources.sqlite3

set -ex

redis-cli FLUSHDB >/dev/null
for file_hash in $(sqlite3 "$FILENAME" 'SELECT hash FROM parsed_source') ; do
    bin/find-strings count "$FILENAME" "$file_hash"
done

redis-cli ZRANGE saw_grammar 0 -1 WITHSCORES
redis-cli KEYS 'grammar:*'

set +x
echo "Total files: $(redis-cli GET num_files)"
