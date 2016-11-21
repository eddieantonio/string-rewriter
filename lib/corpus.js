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

const sqlite3 = require('sqlite3');

const SourceFile = require('./source-file');


/**
 * Given an SQLite3 connection, wraps it in an easy-to-use corpus burrito.
 */
class Corpus {
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

  /**
   * Calls the given function for each source file in the corpus.
   */
  forEach(callback) {
    const db = this._conn;
    return new Promise((resolve, reject) => {
      db.each(
        `SELECT hash, ast FROM parsed_source`,
        function (err, row) {
          if (err) return reject(err);

          callback(new SourceFileFromCorpus(row));
        },
        function (err, numberOfRows) {
          if (err) reject(err);
          else resolve(numberOfRows);
        }
      );
    });
  }

  /**
   * Promises the corpus.
   */
  get(hash) {
    const db = this._conn;
    return new Promise((resolve, reject) => {
      db.get(`
          SELECT hash, ast, tokens
            FROM parsed_source
           WHERE hash = ?
        `, hash,
        (err, row) => {
          if (err) reject(err);
          else resolve(new SourceFileFromCorpus(row));
        }
      );
    });
  }

  static connect(filename) {
    return new Corpus(
      new sqlite3.Database(filename, sqlite3.OPEN_READONLY)
    );
  }
}

module.exports = Corpus;


/**
 * A SourceFile that is backed by a corpus.
 */
class SourceFileFromCorpus extends SourceFile {
  constructor({hash, ast}) {
    super();

    this._hash = hash;
    this._ast = JSON.parse(ast);
  }

  get hash() {
    return this._hash;
  }

  get ast() {
    return this._ast;
  }
}
