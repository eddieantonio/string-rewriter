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

exports.SourceFile = require('./lib/source-file');
exports.Grammar = require('./lib/grammar');
exports.GrammarRegistry = require('./lib/grammar-registry');

exports.parseGrammar = require('./lib/parse-grammar');
exports.globalRegistery = require('./lib/global-registry');

exports.Corpus = class Corpus {
  constructor(connection) {
    this._conn = connection;
  }

  size() {
    const db = this._conn;
    return new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) as count FROM parsed_source`, (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });
  }
};
