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

test.todo('from template {head,body,tail}s.');
test.todo('tolerates string escapes');
test.todo('tolerates utf-16 string escapes');
test.todo('fails on invalid surrogate escpaes');
test.todo('tolerates Unicode code point string escapes');
