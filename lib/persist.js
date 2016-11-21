/*
 * Copyright 2016 Eddie Antonio Santos <easantos@ualberta.ca>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {ArgumentError} = require('common-errors');
const redis = require('redis');

const {Grammar} = require('../');

const FILES_SEEN = 'num_files';
const SAW_GRAMMAR = 'saw_grammar';
const STRING_TOTAL = 'string:total';
const STRING_MATCHING = 'string:structured';

module.exports = class Persist {
  constructor(client = required`redisClient`) {
    if (!(client instanceof redis.RedisClient)) {
      throw new ArgumentError('client', `expecting a RedisClient; instead got ${client}`);
    }
    this._client = client;
  }

  /**
   * Add a single occurrence of a grammar at the given index in the file..
   */
  addOccurrences(hash, occurrences) {
    if (occurrences.length < 1) {
      return Promise.resolve(0);
    }

    return new Promise((resolve, reject) => {
      const [[sample]] = occurrences;
      if (!(sample instanceof Grammar)) {
        reject(new ArgumentError('not a grammar'));
      }

      const client = this._client;
      const stringsTotal = occurrences.length;
      const matchingStrings = occurrences
        .filter(entry => entry.length > 0).length;

      if (stringsTotal < matchingStrings) {
        return reject(new Error(
          `Found ${matchingStrings}/${stringsTotal} in ${hash}`
        ));
      }

      let multi = client.multi()
        .incr(FILES_SEEN)
        .hset(STRING_TOTAL, hash, stringsTotal)
        .hset(STRING_MATCHING, hash, matchingStrings);

      for (const [name, score] of scoreGrammars(occurrences)) {
        multi = multi
          .zincrby(SAW_GRAMMAR, score, name)
          .sadd(`grammar:${name}`, hash);
      }

      multi.exec(err => {
        if (err) reject(err);
        else resolve(occurrences.length);
      });
    });
  }

  disconnect() {
    this._client.quit();
  }

  static connect() {
    return new Persist(redis.createClient());
  }
};


function scoreGrammars(occurrences) {
  const counter = new Map();
  for (const entry of occurrences) {
    for (const grammar of entry) {
      const key = grammar.name;
      counter.set(key, 1 + (counter.get(key) || 0));
    }
  }

  return counter;
}

function required(name) {
  throw new ArgumentError(name);
}
