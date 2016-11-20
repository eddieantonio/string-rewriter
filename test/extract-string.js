import test from 'ava';

import {extractString} from '../';

test('from single-quoted strings', t => {
  const string = `'hello'`;

  t.is(extractString(string), 'hello');
});

test.todo('from double-quoted strings');
test.todo('from template strings');
test.todo('tolerates string escapes');
test.todo('tolerates utf-16 string escapes');
test.todo('fails on invalid surrogate escpaes');
test.todo('tolerates Unicode code point string escapes');
