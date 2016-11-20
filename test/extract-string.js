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

import {extractString} from '../';

test('from single-quoted strings', t => {
  const string = `'hello'`;

  t.is(extractString(string), 'hello');
});

test('from double-quoted strings', t => {
  const string = `"hello"`;

  t.is(extractString(string), 'hello');
});

test('from standalone template literals', t => {
  const string = '`I am stand\n\talone`';

  t.is(extractString(string), 'I am stand\n\talone');
});

test.todo('barfs on unexpected input');

test.todo('from template {head,body,tail}s.');

test.skip('tolerates string escapes', t => {
  const stress = "`\\'\\\"\\\\\\b\\f\\n\\r\\t\\v`";
  const s1 = "\"\\n\\t\"";
  const s2 = "'\\n\\t'";

  t.is(extractString(stress), "'\"\\\b\f\n\r\t\v");
  t.is(extractString(s1), "\n\t");
  t.is(extractString(s2), "\n\t");
});

test.todo('tolerates utf-16 string escapes');
test.todo('fails on invalid surrogate escpaes');
test.todo('tolerates Unicode code point string escapes');
