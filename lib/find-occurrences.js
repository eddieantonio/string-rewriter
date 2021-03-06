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

const SourceFile = require('./source-file');
const GrammarRegistry = require('./grammar-registry');


module.exports = findOccurrences;

/**
 * For every string in the file, finds every grammar that matches it.
 * Returns the array of occurrences per string, ordered by its position in the
 * file.
 */
function findOccurrences(source, grammars, with_string=false) {
  if (!(source instanceof SourceFile)) {
    throw new ArgumentError('source');
  }
  if (!(grammars instanceof GrammarRegistry)) {
    throw new ArgumentError('grammar');
  }

  const occurrences = [];
  for (const string of source.strings()) {
    const entry = [];
    for (const grammar of grammars.findAllMatchingGrammars(string)) {
      entry.push(grammar);
    }

    occurrences.push(with_string ? { string, grammars: entry } : entry);
  }

  return occurrences;
}
