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

module.exports = class Persist {
  constructor(client = required`redisClient`) {
    if (!(client instanceof redis.RedisClient)) {
      throw new ArgumentError('client', `expecting a RedisClient; instead got ${client}`);
    }
    this._client = client;
  }
};


function required(name) {
  throw new ArgumentError(name);
}
