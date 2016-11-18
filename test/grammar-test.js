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

test('#parse() with a real grammar', t => {
  const URI = require('api-pegjs')('uri/URI');

  // XXX: This is a terrible way of fishing the error out.
  const PegSyntaxError = (() => {
    try {
      new URI('`');
    } catch (e) {
      return e.__proto__.constructor;
    }
    throw new Error('Did not return error constructor...');
  })();

  const uri = new Grammar('URI', text => new URI(text), PegSyntaxError);

  t.true(uri.parse('https://username:password@example.org?query=param#fragment'));
  t.false(uri.parse('gopher:%#@!@#!&^@!%#'));
});
