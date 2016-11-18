import test from 'ava';
import {ArgumentError} from 'common-errors';

import {Grammar} from '../';

test('Grammar exists', (t) => {
  t.notThrows(() => {
    new Grammar('<unnamed>', { parse() {} });
  });
});

test('Grammar rejects invalid arguments', (t) => {
  t.throws(() => { new Grammar(); }, ArgumentError);
  t.throws(() => { new Grammar(''); }, ArgumentError);
  t.throws(() => { new Grammar('', {}); }, ArgumentError);
});

test('Grammar#parse', (t) => {
  const g = new Grammar('<test>', {
    parse(string) {
      const match = string.match(/^(?:0x)?[0-9A-F]+$/i);
      if (match !== null) {
        return parseInt(match[1], 16);
      } else {
        throw new SyntaxError();
      }
    }
  });

  t.throws(() => { g.parse() });
  t.true(g.parse('0x65'));
  t.false(g.parse('0x0g'));
});
