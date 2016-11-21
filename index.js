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
exports.Corpus = require('./lib/corpus');
exports.Persist = require('./lib/persist');

exports.parseGrammar = require('./lib/parse-grammar');
exports.globalRegistry = require('./lib/global-registry');

const {SourceFile, GrammarRegistry} = exports;

const {ArgumentError} = require('common-errors');
exports.findOccurrences = function findOccurrences(source, grammars) {
  if (!(source instanceof SourceFile)) {
    throw new ArgumentError('source');
  }
  if (!(grammars instanceof GrammarRegistry)) {
    throw new ArgumentError('grammar');
  }

  const occurrences = [];
  for (const [pos, string] of source.strings().entries()) {
    occurrences.push([]);
    const entry = occurrences[pos];
    for (const grammar of grammars.findAllMatchingGrammars(string)) {
      entry.push(grammar);
    }
  }

  return occurrences;
};
