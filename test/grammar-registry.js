
import test from 'ava';
import {ArgumentError} from 'common-errors';

import {Grammar, GrammarRegistry} from '../';

test('exists!', t => {
  t.notThrows(() => {
    new GrammarRegistry();
  });
});

test('#addRootGrammar only accepts a grammar as input', t => {
  const registry = new GrammarRegistry();
  const grammar = new Grammar('<root>', () => true);

  t.notThrows(() => {
    registry.addRootGrammar(grammar);
  });

  t.throws(() => {
    registry.addRootGrammar({});
  }, ArgumentError);
});


test('#addRootGrammar only accepts a unique grammars as input', t => {
  const registry = new GrammarRegistry();
  const original = new Grammar('uri', () => true);
  const copycat = new Grammar('uri', () => false);

  t.notThrows(() => { registry.addRootGrammar(original); });
  t.throws(() => { registry.addRootGrammar(copycat); }, ArgumentError);
});


test('is iterable', t => {
  const registry = new GrammarRegistry();
  t.deepEqual(Array.from(registry), []);

  registry.addRootGrammar(new Grammar('<name>', () => {}));

  t.deepEqual(Array.from(registry).length, 1);
  const [[name, fn]] = Array.from(registry);
  t.is(name, '<name>');
});
