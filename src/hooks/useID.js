'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useID = void 0;
var react_1 = require('react');
var utils_1 = require('../utils');
/**
 * If an ID is not given, will generate and memoize an ID to use for a11y
 * or any other purpose.
 * @param id The optional ID provided by props.
 */
function useID(id) {
  return (0, react_1.useMemo)(
    function() {
      return id || (0, utils_1.getStringId)('label');
    },
    [id],
  );
}
exports.useID = useID;
//# sourceMappingURL=useID.js.map
