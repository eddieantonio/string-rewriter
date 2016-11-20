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

const parseGrammar = exports.parseGrammar = require('./lib/parse-grammar');

const registry = exports.globalRegistery = new exports.GrammarRegistry();

const corePeg = require('core-pegjs');
registry.addRootGrammar(
  parseGrammar('iso8601-date', corePeg('iso/8601-dates-times'), 'date')
);
registry.addRootGrammar(
  parseGrammar('iso8601-datetime', corePeg('iso/8601-dates-times'), 'iso_date_time')
);
