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
  t.throws(() => { new Grammar('', () => undefined)}, ArgumentError);
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
  const g = new Grammar('<test>', string => {
    throw new ReferenceError('');
  });

  t.throws(() => g.parse('0x0g'), ReferenceError, 'it should throw');
  t.notThrows(() => g.parse('0x0g', ReferenceError), 'still throws error');
});

test('#parse() with a real grammar', t => {
  const URI = require('api-pegjs')('uri/URI');
  const uri = new Grammar('URI', text => new URI(text)); 

  const PegSyntaxError = (() => {
    try {
      uri.parse('`');
    } catch (e) {
      return e.__proto__.constructor;
    }
    throw new Error('Did not return error constructor...');
  })();

  t.true(uri.parse('https://username:password@example.org?query=param#fragment'));
  t.false(uri.parse('gopher:%#@!@#!&^@!%#', PegSyntaxError));
});
