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

exports.SourceFile = require('./lib/source-file');
exports.Grammar = class Grammar {
  constructor(name = required(), parser = required()) {
    if (typeof name != 'string' || name.length < 1) {
      throw new ArgumentError('Requires a non-empty string name');
    }

    if (!(parser instanceof Function)) {
      throw new ArgumentError('Requires a parser');
    }

    this.name = name;
    this.parser = parser;
  }

  parse(input, errorClass=SyntaxError) {
    try {
      this.parser(input);
      return true;
    } catch (e) {
      if (e instanceof errorClass) {
        return false;
      }
      // rethrow...
      throw e;
    }
  }
};

function required() {
  throw new ArgumentError('required argument missing');
}
