import test from 'ava';
import {NotImplementedError} from 'common-errors';

import {SourceFile} from '../';

test('SourceFile#hash', t => {
  t.throws(() => new SourceFile().hash, NotImplementedError);
});

test('SourceFile#ast', t => {
  t.throws(() => new SourceFile().ast, NotImplementedError);
});

test('SourceFile#tokens', t => {
  t.throws(() => new SourceFile().tokens, NotImplementedError);
});

test('SourceFile#strings()', t => {
  t.throws(() => new SourceFile().tokens, NotImplementedError);
});

