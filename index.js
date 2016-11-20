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

/**
 * Converts string literals into normalized strings.
 */
exports.extractString = (literal) => {
  let match;

  /* Matches single-quoted strings, double-quouted strings, and "standalone"
   * template literals (without any interpolation). */
  if (match = literal.match(/^([`'"])((?:\s|.)*)\1$/)) {
    let [_, _quote, contents] = match;
    return interpretEscapes(contents);
  }

  throw new Error(`Could not parse literal ${literal}`);

  function interpretEscapes(string) {
    return string.replace(/\\(\w)/g, (_, code) => {
      /* http://www.ecma-international.org/ecma-262/7.0/#prod-SingleEscapeCharacter */
      return {
        "'": "'",
        '"': '"',
        "\\": "\\",
        "b": "\b",
        "f": "\f",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "v": "\v"
      }[code];
    });
  }
};
