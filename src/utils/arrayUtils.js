'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.moveMultiFromIndexToIndex = exports.separateItemsWithTarget = exports.separateItemsById = void 0;
var tslib_1 = require('tslib');
/**
 * Separates the ids from the main list and returns separated and remaining.
 * @param allItems All of the items, from which you will separate any matching ids.
 * @param separateIds IDs to separate into separate array.
 */
function separateItemsById(allItems, separateIds) {
  var separated = [];
  var remaining = [];
  allItems.forEach(function(item) {
    if (!separateIds.includes(item.id)) {
      // Keep all unselected files in the files array.
      remaining.push(item);
    } else {
      // Add selected files to the dragging array.
      separated.push(item);
    }
  });
  return [separated, remaining];
}
exports.separateItemsById = separateItemsById;
/**
 * Separates the ids from the main list, but also re-inserts the target back
 * into the remaining items and returns it if it exists. It will only search for
 * a target in the separated array.
 * @param allItems All of the items, from which you will separate any matching ids.
 * @param separateIds IDs to separate into separate array.
 * @param targetId The ID of the target item to re-insert back and return.
 */
function separateItemsWithTarget(allItems, separateIds, targetId) {
  var _a = separateItemsById(allItems, separateIds),
    separated = _a[0],
    remaining = _a[1];
  var target = separated.find(function(item) {
    return item.id === targetId;
  });
  // If target is found, re-insert it into remaining at original index.
  if (target) {
    var targetIndex = allItems.indexOf(target);
    remaining.splice(targetIndex, 0, target);
  }
  return [separated, remaining, target];
}
exports.separateItemsWithTarget = separateItemsWithTarget;
function moveMultiFromIndexToIndex(prev, moveIds, fromIndex, toIndex) {
  var _a;
  var targetId =
    (_a = prev[fromIndex]) === null || _a === void 0 ? void 0 : _a.id;
  if (targetId === undefined || !moveIds.includes(targetId)) return prev;
  var _b = separateItemsById(prev, moveIds),
    separated = _b[0],
    remaining = _b[1];
  var targetIndex = separated.findIndex(function(item) {
    return item.id === targetId;
  });
  // We place the separated so that target lines up with index.
  var insertionIndex = toIndex - targetIndex;
  if (insertionIndex > remaining.length)
    return tslib_1.__spreadArray(
      tslib_1.__spreadArray([], remaining, true),
      separated,
      true,
    );
  if (insertionIndex < 0)
    return tslib_1.__spreadArray(
      tslib_1.__spreadArray([], separated, true),
      remaining,
      true,
    );
  return tslib_1.__spreadArray(
    tslib_1.__spreadArray(
      tslib_1.__spreadArray([], remaining.slice(0, insertionIndex), true),
      separated,
      true,
    ),
    remaining.slice(insertionIndex),
    true,
  );
}
exports.moveMultiFromIndexToIndex = moveMultiFromIndexToIndex;
//# sourceMappingURL=arrayUtils.js.map
