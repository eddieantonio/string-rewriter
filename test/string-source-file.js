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

import {SourceFile} from '../';

test('SourceFileFromString#strings()', t => {
  const sourceFile = SourceFile.fromString(`
    "\\n\\t"
  `);

  t.deepEqual(sourceFile.strings(), ["\n\t"]);
});


test('SourceFileFromString#strings() with templates', t => {
  const TICK = '`';
  const sourceFile = SourceFile.fromString(`
    \`https://example.org/#\\u{1f4a9}\`
  `);

  t.deepEqual(sourceFile.strings(), [
    "https://example.org/#💩"
  ]);
});

test('SourceFileFromString#strings() multiple strings', t => {
  const sourceFile = SourceFile.fromString(`
    "\\n\\t", '\\v\\b', \`\\u{1f4a9}\`
  `);

  t.deepEqual(sourceFile.strings(), [
    "\n\t", "\v\b", "💩"
  ]);
});

test.skip('SourceFileFromString#strings() with raw templates', t => {
  const sourceFile = SourceFile.fromString(`
    String.raw\`\\n\\t\`
  `);

  t.deepEqual(sourceFile.strings(), [
    "\\n\\t"
  ]);
});
