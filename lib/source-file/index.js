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

const NotImplementedError = require('common-errors').NotImplementedError;
const walk = require('esprima-walk');


class SourceFile {
  get ast() {
    throw new NotImplementedError();
  }
  get tokens() {
    throw new NotImplementedError();
  }
  get hash() {
    throw new NotImplementedError();
  }

  /**
   * Return the necessary strings as an array.
   */
  strings() {
    /* Delegate to the subclass to get the AST. */
    const ast = this.ast;

    const strings = [];
    walk(ast, node => {
      if (node.type === 'Literal' && typeof node.value == 'string') {
        strings.push(node.value);
      } else if (node.type === 'TemplateElement') {
        strings.push(node.value.cooked);
      }
    });

    return strings;
  }

  static fromString(string) {
    return new SourceFileFromString(string);
  }
}

module.exports = SourceFile;
const SourceFileFromString = require('./from-string');
