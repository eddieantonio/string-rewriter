const NotImplementedError = require('common-errors').NotImplementedError;

module.exports = class SourceFile {
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
   * Yields the necessary strings.
   */
  *strings() {
    throw new NotImplementedError();
  }
};
