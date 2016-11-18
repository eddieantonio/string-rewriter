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

const Grammar = require('./grammar');


module.exports = class GrammarRegistry {
  constructor() {
    this._roots = new Map();
  }

  /**
   * Adds a root grammar.
   */
  addRootGrammar(grammar) {
    if (!(grammar instanceof Grammar)) {
      throw new ArgumentError('grammar');
    }

    if (this._roots.has(grammar.name)) {
      throw new ArgumentError('grammar', `${grammar.name} already defined`);
    }

    this._roots.set(grammar.name, grammar);
  }

  /**
   * Yields pairs of the grammar names and their instances.
   */
  *[Symbol.iterator]() {
    /* Delegate to the map's entries. */
    for (let entry of this._roots.entries()) {
      yield entry;
    }
  }
};
