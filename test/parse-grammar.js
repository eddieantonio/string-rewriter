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

import test from 'ava';

import {Grammar, parseGrammar} from '../';

test('create a Grammar instance from a PEG.js grammar', t => {
  const grammar = parseGrammar('hello', `
    start
      = 'hell' 'o'+
  `);

  t.true(grammar instanceof Grammar);
  t.is(grammar.name, 'hello');
  t.true(grammar.parse('hello'));
  t.false(grammar.parse('hell'));
});

test('create a Grammar instance, specifying the start production', t => {
  const grammar = parseGrammar('hello', `
    prefix
      = 'hello'

    hello
      = prefix 'o'*
  `, 'hello');

  t.true(grammar instanceof Grammar);
  t.is(grammar.name, 'hello');
  t.true(grammar.parse('hello'));
  t.true(grammar.parse('hellooo'));
});
