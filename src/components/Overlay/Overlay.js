'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Overlay = void 0;
var react_1 = require('react');
var react_dom_1 = require('react-dom');
function generateOverlayLayer() {
  var currentId = 1;
  var elements = new Set();
  var classes = {};
  var overlayRoot = document.createElement('div');
  overlayRoot.classList.add('ui__base', 'ui__overlay');
  var appendElement = function() {
    return document.body.appendChild(overlayRoot);
  };
  var removeElement = function() {
    return document.body.removeChild(overlayRoot);
  };
  var addClass = function(className) {
    if (!className) return;
    overlayRoot.classList.add(className);
    classes[className] = (classes[className] || 0) + 1;
  };
  var removeClass = function(className) {
    if (!className) return;
    classes[className] = (classes[className] || 0) - 1;
    if (classes[className] <= 0) {
      delete classes[className];
      overlayRoot.classList.remove(className);
    }
  };
  var add = function(props) {
    var id = currentId++;
    addClass(props.className);
    elements.add(id);
    if (elements.size === 1) appendElement();
    return function() {
      elements.delete(id);
      removeClass(props.className);
      if (elements.size === 0) removeElement();
    };
  };
  return function(_a) {
    var children = _a.children,
      className = _a.className;
    (0, react_1.useEffect)(
      function() {
        return add({ className: className });
      },
      [className],
    );
    return (0, react_dom_1.createPortal)(children, overlayRoot);
  };
}
var Overlay;
exports.Overlay = Overlay;
if (typeof window !== 'undefined') {
  exports.Overlay = Overlay = generateOverlayLayer();
} else {
  exports.Overlay = Overlay = function() {
    return null;
  };
}
//# sourceMappingURL=Overlay.js.map
