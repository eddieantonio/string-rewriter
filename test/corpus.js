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

import {readFileSync} from 'fs';

import test from 'ava';
import sqlite3 from 'sqlite3';

import {Corpus} from '../';


const testDb = readFileSync(`${__dirname}/initial.sql`, 'utf8');
const hashA = 'c48ebd00b8a0f8ccc10eaaffd26bf474ae8076dc9b4077fc1ba6bc6aee15d851';
const hashB = 'fd30ede6650fc5f42c1aeb13e261f10eab31e8a50e8f69d461c10ee36a307b84';
const hashC = '6d2f748e01c7a813b876ce2f3a3140048885aa2a120903882dad0c5d22756e7e';


sqlite3.verbose();

test.beforeEach(async t => {
  const conn = t.context.conn = await testSQLite3Connection();
  t.context.corpus = new Corpus(conn);
});

test.afterEach(t => {
  t.context.conn.close();
});

test('#length returns the database length', async t => {
  const {corpus} = t.context;
  t.is(await corpus.size(), 3);
});


function testSQLite3Connection() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(':memory:');
    db.exec(testDb, (err)  => {
      if (err) reject(err);
      else resolve(db);
    });
  });
}
