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

import {globalRegistery} from '../';

test('parses ISO dates', t => {
  const date = globalRegistery.get('iso8601');

  t. true(date.parse('1992-02-27'));
  t.false(date.parse('1992-02-27T'));
  t. true(date.parse('1992-02-27T13:00:00'));
  t.false(date.parse('1992-02-27T13:00:00-'));
  t. true(date.parse('1992-02-27T13:00:00-600'));
});
