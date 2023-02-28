'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Image = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var data_1 = require('../../data');
exports.Image = (0, react_1.forwardRef)(function(_a, ref) {
  var src = _a.src,
    pending = _a.pending,
    onRenderLoading = _a.onRenderLoading,
    onRenderFallback = _a.onRenderFallback,
    alt = _a.alt,
    className = _a.className,
    imgProps = tslib_1.__rest(_a, [
      'src',
      'pending',
      'onRenderLoading',
      'onRenderFallback',
      'alt',
      'className',
    ]);
  var sourceIsNotPromise = typeof src === 'string' || !src;
  var _b = (0, react_1.useState)(!sourceIsNotPromise),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(sourceIsNotPromise ? src : undefined),
    source = _c[0],
    setSource = _c[1];
  var getSource = (0, react_1.useCallback)(function(srcGetter) {
    return tslib_1.__awaiter(void 0, void 0, void 0, function() {
      var fetchedSource, _a;
      return tslib_1.__generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            setLoading(true);
            fetchedSource = undefined;
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              (0, data_1.futureableOrLazyToFuturable)(srcGetter),
            ];
          case 2:
            fetchedSource = _b.sent();
            return [3 /*break*/, 4];
          case 3:
            _a = _b.sent();
            return [3 /*break*/, 4];
          case 4:
            setLoading(false);
            setSource(fetchedSource || undefined);
            return [2 /*return*/];
        }
      });
    });
  }, []);
  (0, react_1.useEffect)(
    function() {
      if (sourceIsNotPromise) {
        setLoading(false);
        setSource(src || undefined);
        return;
      }
      getSource(src);
    },
    [getSource, sourceIsNotPromise, src],
  );
  var imageClass = (0, classnames_1.default)('ui__image', className);
  if (loading || pending)
    return react_1.default.createElement(
      react_1.default.Fragment,
      null,
      onRenderLoading === null || onRenderLoading === void 0
        ? void 0
        : onRenderLoading(),
    );
  if (!source)
    return react_1.default.createElement(
      react_1.default.Fragment,
      null,
      onRenderFallback === null || onRenderFallback === void 0
        ? void 0
        : onRenderFallback(),
    );
  return react_1.default.createElement(
    'img',
    tslib_1.__assign({}, imgProps, {
      alt: alt,
      src: source,
      className: imageClass,
      ref: ref,
    }),
  );
});
//# sourceMappingURL=Image.js.map
