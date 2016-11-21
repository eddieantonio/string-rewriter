
import test from 'ava';
import {ArgumentError, NotFoundError} from 'common-errors';

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

test('#get returns the named grammar', t => {
  const registry = new GrammarRegistry();
  const grammar = new Grammar('uri', () => true);
  registry.addRootGrammar(grammar);

  t.is(registry.get('uri'), grammar);
});

test('#get fails given an incorrect name', t => {
  const registry = new GrammarRegistry();
  const grammar = new Grammar('uri', () => true);
  registry.addRootGrammar(grammar);

  t.throws(() => registry.get('url'), NotFoundError);
});

test('is iterable', t => {
  const registry = new GrammarRegistry();
  t.deepEqual(Array.from(registry), []);

  registry.addRootGrammar(new Grammar('<name>', () => {}));

  t.deepEqual(Array.from(registry).length, 1);
  const [[name, _]] = Array.from(registry);
  t.is(name, '<name>');
});

test('finds all matching grammars', t => {
  const registry = new GrammarRegistry();
  registry.addRootGrammar(new Grammar('<a>', () => true));
  registry.addRootGrammar(new Grammar('<b>', () => { throw new SyntaxError; }));
  registry.addRootGrammar(new Grammar('<c>', () => true));

  const results = registry.findAllMatchingGrammars('string');
  t.is(results.length, 2);

  const [a, c] = results;
  t.is(a, registry.get('<a>'));
  t.is(c, registry.get('<c>'));
});
