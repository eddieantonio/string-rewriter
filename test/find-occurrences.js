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

import {ArgumentError} from 'common-errors';

import {SourceFile, Grammar, findOccurrences} from '../';

test.beforeEach(t => {
  t.context.source = SourceFile.fromString(`
    console.log('hello, world!');
  `);

  t.context.helloGrammar = new Grammar('<always>', s => {
    return s.includes('hello') || error();
  });
  t.context.alwaysMatches = new Grammar('<always>', () => true);
  t.context.neverMatches = new Grammar('<never>', () => error());
  function error() {
    throw new SyntaxError();
  }
});

test('throws if not given a SourceFile and a Grammar', t => {
  const {source, helloGrammar} = t.context;

  t.throws(() => findOccurrences({}, helloGrammar), ArgumentError);
  t.throws(() => findOccurrences(source, {}), ArgumentError);
  t.throws(() => findOccurrences(helloGrammar, source), ArgumentError);
  t.notThrows(() => findOccurrences(source, helloGrammar), ArgumentError);
});
