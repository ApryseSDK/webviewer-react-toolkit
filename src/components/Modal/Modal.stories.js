'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnmountExample = exports.Scrolling = exports.WithButtonGroup = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importStar(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Button_1 = require('../Button');
var Modal_1 = require('../Modal');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Modal',
  component: Modal_1.Modal,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    Modal_1.Modal,
    {
      open: (0, addon_knobs_1.boolean)('open', true),
      closeOnBackgroundClick: (0, addon_knobs_1.boolean)(
        'closeOnBackgroundClick',
        false,
      ),
      closeOnEscape: (0, addon_knobs_1.boolean)('closeOnEscape', false),
      heading: (0, addon_knobs_1.text)('heading', 'Modal heading'),
      fullWidth: (0, addon_knobs_1.boolean)('fullWidth', false),
      onClose: (0, addon_knobs_1.boolean)('has onClose', true)
        ? (0, action_1.action)('onClose')
        : undefined,
    },
    (0, addon_knobs_1.text)(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!',
  );
};
exports.Basic = Basic;
var WithButtonGroup = function() {
  return react_1.default.createElement(
    Modal_1.Modal,
    {
      open: (0, addon_knobs_1.boolean)('open', true),
      closeOnBackgroundClick: (0, addon_knobs_1.boolean)(
        'closeOnBackgroundClick',
        false,
      ),
      closeOnEscape: (0, addon_knobs_1.boolean)('closeOnEscape', false),
      heading: (0, addon_knobs_1.text)('heading', 'Modal heading'),
      fullWidth: (0, addon_knobs_1.boolean)('fullWidth', false),
      onClose: (0, addon_knobs_1.boolean)('has onClose', true)
        ? (0, action_1.action)('onClose')
        : undefined,
      buttonGroup: react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(Button_1.Button, null, 'Accept'),
        react_1.default.createElement(
          Button_1.Button,
          { buttonStyle: 'outline' },
          'Cancel',
        ),
      ),
    },
    (0, addon_knobs_1.text)(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!',
  );
};
exports.WithButtonGroup = WithButtonGroup;
var lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus eget nunc scelerisque viverra. In dictum non consectetur a erat nam at. Euismod quis viverra nibh cras pulvinar mattis. Quis auctor elit sed vulputate mi. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Magna fermentum iaculis eu non diam. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Blandit libero volutpat sed cras ornare arcu. Diam phasellus vestibulum lorem sed risus ultricies. Egestas purus viverra accumsan in nisl nisi.\n\nDictum fusce ut placerat orci nulla pellentesque dignissim enim. Lectus nulla at volutpat diam ut. Tellus elementum sagittis vitae et leo duis ut diam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Enim eu turpis egestas pretium aenean pharetra. Sed viverra tellus in hac. Velit sed ullamcorper morbi tincidunt ornare. Consequat mauris nunc congue nisi vitae suscipit. Blandit massa enim nec dui nunc mattis enim ut. Sed augue lacus viverra vitae congue eu consequat ac. Iaculis at erat pellentesque adipiscing. Amet risus nullam eget felis eget nunc. Sodales ut etiam sit amet nisl purus in mollis. Proin sed libero enim sed faucibus turpis. Sapien nec sagittis aliquam malesuada bibendum arcu. Bibendum at varius vel pharetra vel turpis nunc. Pellentesque habitant morbi tristique senectus. Euismod elementum nisi quis eleifend. Augue ut lectus arcu bibendum at varius vel pharetra.\n\nAliquam nulla facilisi cras fermentum odio. Est velit egestas dui id ornare. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Sit amet risus nullam eget felis eget nunc lobortis. Neque ornare aenean euismod elementum nisi quis eleifend. Sed ullamcorper morbi tincidunt ornare. Non enim praesent elementum facilisis leo vel fringilla. Amet dictum sit amet justo donec enim diam. Consectetur adipiscing elit duis tristique sollicitudin. Consequat id porta nibh venenatis cras sed felis. Viverra tellus in hac habitasse. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Faucibus purus in massa tempor nec. Interdum posuere lorem ipsum dolor sit amet consectetur. Facilisi cras fermentum odio eu feugiat. Arcu ac tortor dignissim convallis aenean et tortor at. Nascetur ridiculus mus mauris vitae ultricies leo.\n\nAdipiscing elit duis tristique sollicitudin nibh sit. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Adipiscing elit duis tristique sollicitudin nibh. Aliquam etiam erat velit scelerisque in dictum. Tristique magna sit amet purus gravida quis blandit turpis cursus. Fermentum leo vel orci porta non. Et sollicitudin ac orci phasellus. Arcu dui vivamus arcu felis. Dignissim suspendisse in est ante in nibh mauris cursus. Sit amet nisl purus in mollis nunc sed id. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Duis convallis convallis tellus id. Mauris pharetra et ultrices neque ornare aenean euismod. Aliquet porttitor lacus luctus accumsan tortor posuere.\n\nTortor pretium viverra suspendisse potenti nullam ac tortor vitae. Eu turpis egestas pretium aenean. Justo eget magna fermentum iaculis eu non diam. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Malesuada fames ac turpis egestas sed tempus urna et. Cras sed felis eget velit aliquet sagittis id consectetur. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Malesuada fames ac turpis egestas maecenas pharetra. Magnis dis parturient montes nascetur ridiculus mus mauris. Molestie ac feugiat sed lectus vestibulum mattis. Ac orci phasellus egestas tellus. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Morbi non arcu risus quis varius. Pulvinar proin gravida hendrerit lectus a. Id velit ut tortor pretium viverra. Mauris pellentesque pulvinar pellentesque habitant morbi. Etiam non quam lacus suspendisse faucibus interdum. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Accumsan lacus vel facilisis volutpat.\n\nTellus elementum sagittis vitae et leo duis ut diam. Ut eu sem integer vitae justo eget magna. Eu volutpat odio facilisis mauris sit amet massa. Enim nec dui nunc mattis enim. Varius duis at consectetur lorem donec massa sapien. Molestie nunc non blandit massa enim nec. Id donec ultrices tincidunt arcu non sodales neque sodales. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Sit amet nisl suscipit adipiscing. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Facilisis magna etiam tempor orci eu lobortis elementum. Cras sed felis eget velit aliquet sagittis id consectetur.\n\nPorttitor leo a diam sollicitudin tempor id eu. Enim nec dui nunc mattis enim ut tellus elementum. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Quis varius quam quisque id diam. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Auctor urna nunc id cursus. Odio ut sem nulla pharetra diam sit amet. Interdum posuere lorem ipsum dolor. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Libero id faucibus nisl tincidunt eget nullam non. Ut tortor pretium viverra suspendisse potenti. Ullamcorper dignissim cras tincidunt lobortis feugiat. Tristique risus nec feugiat in fermentum. Donec pretium vulputate sapien nec. Est pellentesque elit ullamcorper dignissim cras.\n\nNon odio euismod lacinia at quis risus sed. In iaculis nunc sed augue lacus. Mi sit amet mauris commodo quis imperdiet. Morbi quis commodo odio aenean sed adipiscing diam donec. Pretium fusce id velit ut tortor. Enim blandit volutpat maecenas volutpat. Ultrices vitae auctor eu augue ut. Sociis natoque penatibus et magnis dis. Leo urna molestie at elementum eu. Dictum non consectetur a erat nam at lectus urna. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Sem et tortor consequat id porta. Commodo elit at imperdiet dui accumsan sit amet nulla. Ultrices in iaculis nunc sed augue lacus. Duis convallis convallis tellus id interdum velit laoreet. Duis at consectetur lorem donec massa sapien. Sit amet justo donec enim. Orci eu lobortis elementum nibh.\n\nNisl nunc mi ipsum faucibus. Arcu dui vivamus arcu felis bibendum. Rhoncus urna neque viverra justo nec ultrices dui sapien. Proin fermentum leo vel orci porta non pulvinar neque. Tincidunt eget nullam non nisi est sit. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Faucibus purus in massa tempor nec feugiat nisl pretium. Amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id volutpat lacus laoreet. Sem integer vitae justo eget magna fermentum. Semper risus in hendrerit gravida. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in hac habitasse platea. Vitae sapien pellentesque habitant morbi tristique senectus et netus et.\n\nMaecenas volutpat blandit aliquam etiam erat velit. Arcu felis bibendum ut tristique et egestas. Varius vel pharetra vel turpis nunc eget lorem. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Ultrices dui sapien eget mi proin. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Sociis natoque penatibus et magnis dis. Vel eros donec ac odio. Pharetra sit amet aliquam id. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Dictum sit amet justo donec enim. Proin fermentum leo vel orci porta. Et magnis dis parturient montes nascetur ridiculus.\n';
var Scrolling = function() {
  return react_1.default.createElement(
    Modal_1.Modal,
    {
      open: (0, addon_knobs_1.boolean)('open', true),
      closeOnBackgroundClick: (0, addon_knobs_1.boolean)(
        'closeOnBackgroundClick',
        false,
      ),
      closeOnEscape: (0, addon_knobs_1.boolean)('closeOnEscape', false),
      heading: (0, addon_knobs_1.text)('heading', 'Modal heading'),
      fullWidth: (0, addon_knobs_1.boolean)('fullWidth', false),
      onClose: (0, addon_knobs_1.boolean)('has onClose', true)
        ? (0, action_1.action)('onClose')
        : undefined,
      buttonGroup: react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(Button_1.Button, null, 'Accept'),
        react_1.default.createElement(
          Button_1.Button,
          { buttonStyle: 'outline' },
          'Cancel',
        ),
      ),
    },
    react_1.default.createElement(
      'p',
      { style: { whiteSpace: 'pre-wrap' } },
      lorem,
    ),
  );
};
exports.Scrolling = Scrolling;
var Timer = function() {
  var _a = (0, react_1.useState)(0),
    seconds = _a[0],
    setSeconds = _a[1];
  (0, react_1.useEffect)(function() {
    var increment = function() {
      return setSeconds(function(prev) {
        return prev + 1;
      });
    };
    var timer = window.setInterval(increment, 1000);
    return function() {
      window.clearInterval(timer);
    };
  }, []);
  return react_1.default.createElement(
    'p',
    null,
    'Time passed: ',
    seconds,
    ' second',
    seconds === 1 ? '' : 's',
  );
};
var UnmountExample = function() {
  var noUnmount = (0, addon_knobs_1.boolean)('noUnmount', false);
  return react_1.default.createElement(
    Modal_1.Modal,
    {
      open: (0, addon_knobs_1.boolean)('open', true),
      onClose: (0, action_1.action)('onClose'),
      noUnmount: noUnmount,
      heading: noUnmount
        ? 'noUnmount true, time will persist'
        : 'noUnmount false, time will reset',
    },
    react_1.default.createElement(Timer, null),
  );
};
exports.UnmountExample = UnmountExample;
//# sourceMappingURL=Modal.stories.js.map
