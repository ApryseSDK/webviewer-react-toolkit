'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getId = exports.getStringId = void 0;
var currentId = 0;
/**
 * Generates a sequential string to use as a unique identifier. This should be
 * used over `getId` if you need to use it as a DOM id, or a React key.
 *
 * @param prefix Optional. Prefix for the string id.
 */
function getStringId(prefix) {
  if (prefix === void 0) {
    prefix = 'id';
  }
  return ''.concat(prefix, '_').concat((currentId++).toString(16));
}
exports.getStringId = getStringId;
/**
 * Returns a Symbol to uniquely identify something. Will fallback to using
 * string.
 *
 * @param description Description of the Symbol. Used as string prefix if not supported.
 */
function getId(description) {
  if (typeof Symbol === 'function') return Symbol(description);
  return ''.concat(description, '_').concat(getStringId());
}
exports.getId = getId;
//# sourceMappingURL=idUtils.js.map
