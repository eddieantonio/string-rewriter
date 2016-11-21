import test from 'ava';
import {ArgumentError} from 'common-errors';

import {Grammar} from '../';

test('exists!', t => {
  t.notThrows(() => {
    new Grammar('<unnamed>', () => undefined);
  });
});

test('rejects invalid arguments', t => {
  t.throws(() => { new Grammar(); }, ArgumentError);
  t.throws(() => { new Grammar(''); }, ArgumentError);
  t.throws(() => { new Grammar('', () => undefined); }, ArgumentError);
});

test('#parse() usage', t => {
  const g = new Grammar('<test>', string => {
    const match = string.match(/^(?:0x)?[0-9A-F]+$/i);
    if (match !== null) {
      return parseInt(match[1], 16);
    } else {
      throw new SyntaxError();
    }
  });

  t.throws(() => g.parse());
  t.true(g.parse('0x65'));
  t.false(g.parse('0x0g'));
});

test('#parse() custom error instance', t => {
  const withDefault = new Grammar('<test>', () => {
    throw new RangeError('fake error');
  });

  const withSpecified = new Grammar('<test>', () => {
    throw new RangeError('fake error');
  }, RangeError);

  t.throws(() => withDefault.parse('0x0g'), RangeError);
  t.notThrows(() => withSpecified.parse('0x0g'), 'this should not throw');
});
