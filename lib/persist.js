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

const assert = require('assert');

const {ArgumentError} = require('common-errors');
const redis = require('redis');

const UNIQUE_OCCURENCES = 'unique_occurrences';
const SAW_GRAMMAR = 'saw_grammar';

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
  addOccurrence(hash, grammar, index) {
    assert.equal(typeof index, 'number');
    assert.equal(~~index, index);
    assert(grammar instanceof Grammar);

    return new Promise((resolve, reject) => {
      const client = this._client;
      const id = `${hash}:${position}`;

      client.pfadd(UNIQUE_OCCURENCES, id, (err, altered) => {
        if (err) return reject(err);

        if (!altered) {
          console.error(`Perhaps saw ${key}`);
        }

        client.zincrby(SAW_GRAMMAR, 1, grammar.name);
        resolve();
      });
    });
  }
    
};


function required(name) {
  throw new ArgumentError(name);
}
