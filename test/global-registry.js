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

import {globalRegistry} from '../';

test('parses ISO 8601 dates', t => {
  const date = globalRegistry.get('iso8601-date');

  t.true(date.parse('1992-02-27'));
  t.true(date.parse('1992-02-27'));
  t.false(date.parse('1992-02-27T13:00:00'));
});

test('parses ISO 8601 datetimes', t => {
  const datetime = globalRegistry.get('iso8601-datetime');

  t.true(datetime.parse('1992-02-27T13:00:00'));
  t.true(datetime.parse('1992-02-27T13:00:00-06:00'));
  t.true(datetime.parse('1992-02-27T13:00:00Z'));
  t.false(datetime.parse('1992-02-27T13:00:00-'));
  t.false(datetime.parse('1992-02-27'));
});

test('parses URIs', t => {
  const uri = globalRegistry.get('rfc3986-uri');

  t.true(uri.parse('http://example.org'));
  t.true(uri.parse('https://example.org/'));
  t.true(uri.parse('https://example.org/index.php?q=hello'));
  t.true(uri.parse('https://example.org/search%20page.php?q=hello'));
  t.true(uri.parse('https://example.org/search%20page.php?q=hello#content'));
  t.true(uri.parse('git+ssh://user@server/project.git'));
  t.false(uri.parse('https://example.org/search page.php?q=hello#content'));

  /* From other tests. */
  t.true(uri.parse('https://username:password@example.org?query=param#fragment'));
  t.false(uri.parse('gopher:%#@!@#!&^@!%#'));
});

test('parses IPv4 addresses', t => {
  const ipv4 = globalRegistry.get('rfc1123-ipv4');

  t.true(ipv4.parse('127.0.0.1'));
  t.true(ipv4.parse('255.255.255.255'));
  t.false(ipv4.parse('::1'));
});

test('parses IPv6 addresses', t => {
  const ipv6 = globalRegistry.get('rfc3513-ipv6');

  t.true(ipv6.parse('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210'));
  t.true(ipv6.parse('::1'));
  t.false(ipv6.parse('127.0.0.1'));
});

test('parses UUIDs', t => {
  const uuid = globalRegistry.get('rfc4122-uuid');

  t.true(uuid.parse('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
  t.true(uuid.parse('6c84fb90-12c4-11e1-840d-7b25c5ee775a'));
  t.true(uuid.parse('110ec58a-a0f2-4ac4-8393-c866d813b8d1'));
  t.false(uuid.parse('f1d4fae-7dec-11d0-a765-00a0c91e6bf6'));
  t.false(uuid.parse('f81d4fae-7dec-11d0-a765-a0c91e6bf6'));
  t.false(uuid.parse('f81d4fae-7dec-11d0-a765-a0u91e6bf6'));
});


test('parses SemVer <http://semver.org/>', t => {
  const semver = globalRegistry.get('semver');

  t.true(semver.parse('2.0.0'));
  t.true(semver.parse('0.1.0'));
  t.true(semver.parse('1.0.0-beta'));
  t.true(semver.parse('2.0.0-rc.2'));
  t.false(semver.parse('2.0.x'));
  t.false(semver.parse('0.1'));
  t.false(semver.parse('=v1.2.3'));
  t.false(semver.parse('>=2.5.0'));
});
