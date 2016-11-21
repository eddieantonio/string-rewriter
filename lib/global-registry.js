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

const {readFileSync, realpathSync} = require('fs');

const semver = require('semver');
const corePeg = require('core-pegjs');

const Grammar = require('./grammar');
const GrammarRegistry = require('./grammar-registry');
const parseGrammar = require('./parse-grammar');

const registry = module.exports = new GrammarRegistry();


registry.addRootGrammar(
  parseGrammar('iso8601-date', corePeg('iso/8601-dates-times'), 'date')
);
registry.addRootGrammar(
  parseGrammar('iso8601-datetime', corePeg('iso/8601-dates-times'), 'iso_date_time')
);

registry.addRootGrammar(
  parseGrammar('rfc3986-uri', corePeg('ietf/rfc3986-uri'), 'URI')
);

registry.addRootGrammar(
  parseGrammar('rfc1123-ipv4', corePeg('ietf/rfc3986-uri'), 'IPv4address')
);

registry.addRootGrammar(
  parseGrammar('rfc3513-ipv6', corePeg('ietf/rfc3986-uri'), 'IPv6address')
);

registry.addRootGrammar(
  parseGrammar('rfc4122-uuid', local('rfc4122-uuid'), 'UUID')
);

registry.addRootGrammar(
  new Grammar('semver', string => {
    if (semver.valid(string)) return true;
    else throw new SyntaxError();
  })
);

function local(name) {
  const filename = realpathSync(`${__dirname}/../grammars/${name}.pegjs`);
  return readFileSync(filename, 'utf8');
}
