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

import {SourceFile, GrammarRegistry, Grammar, findOccurrences} from '../';

test.beforeEach(t => {
  t.context.source = SourceFile.fromString(`
    console.log('hello, world!');
    console.log('goodby, world!');
  `);

  const registry = t.context.registry = new GrammarRegistry();

  registry.addRootGrammar(new Grammar('hello', s => {
    return s.includes('hello') || error();
  }));
  registry.addRootGrammar(new Grammar('always', () => true));
  registry.addRootGrammar(new Grammar('never', () => error()));

  function error() {
    throw new SyntaxError();
  }
});

test('throws if not given a SourceFile and a GrammarRegistry', t => {
  const {source, registry} = t.context;

  t.throws(() => findOccurrences({}, registry), ArgumentError);
  t.throws(() => findOccurrences(source, {}), ArgumentError);
  t.throws(() => findOccurrences(registry, source), ArgumentError);
  t.notThrows(() => findOccurrences(source, registry), ArgumentError) ;
});

test('it finds multiple occurrences', t => {
  const {source, registry} = t.context;
  const occurrences = findOccurrences(source, registry);

  const [always, hello] = ['always', 'hello'].map(s => registry.get(s));

  t.is(occurrences.length, 2);
  const expected = [
    [hello, always],
    [always]
  ];
  t.deepEqual(occurrences, expected);
});
