import { boolean, text } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Button } from '../Button';
import { Modal } from '../Modal';
import readme from './README.md';

export default { title: 'Components/Modal', component: Modal, parameters: { readme } };

export const Basic = () => (
  <Modal
    open={boolean('open', true)}
    closeOnBackgroundClick={boolean('closeOnBackgroundClick', false)}
    closeOnEscape={boolean('closeOnEscape', false)}
    heading={text('heading', 'Modal heading')}
    fullWidth={boolean('fullWidth', false)}
    onClose={boolean('has onClose', true) ? action('onClose') : undefined}
  >
    {text(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!'}
  </Modal>
);

export const WithButtonGroup = () => (
  <Modal
    open={boolean('open', true)}
    closeOnBackgroundClick={boolean('closeOnBackgroundClick', false)}
    closeOnEscape={boolean('closeOnEscape', false)}
    heading={text('heading', 'Modal heading')}
    fullWidth={boolean('fullWidth', false)}
    onClose={boolean('has onClose', true) ? action('onClose') : undefined}
    buttonGroup={
      <>
        <Button>Accept</Button>
        <Button buttonStyle="outline">Cancel</Button>
      </>
    }
  >
    {text(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!'}
  </Modal>
);

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus eget nunc scelerisque viverra. In dictum non consectetur a erat nam at. Euismod quis viverra nibh cras pulvinar mattis. Quis auctor elit sed vulputate mi. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Magna fermentum iaculis eu non diam. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Blandit libero volutpat sed cras ornare arcu. Diam phasellus vestibulum lorem sed risus ultricies. Egestas purus viverra accumsan in nisl nisi.

Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Lectus nulla at volutpat diam ut. Tellus elementum sagittis vitae et leo duis ut diam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Enim eu turpis egestas pretium aenean pharetra. Sed viverra tellus in hac. Velit sed ullamcorper morbi tincidunt ornare. Consequat mauris nunc congue nisi vitae suscipit. Blandit massa enim nec dui nunc mattis enim ut. Sed augue lacus viverra vitae congue eu consequat ac. Iaculis at erat pellentesque adipiscing. Amet risus nullam eget felis eget nunc. Sodales ut etiam sit amet nisl purus in mollis. Proin sed libero enim sed faucibus turpis. Sapien nec sagittis aliquam malesuada bibendum arcu. Bibendum at varius vel pharetra vel turpis nunc. Pellentesque habitant morbi tristique senectus. Euismod elementum nisi quis eleifend. Augue ut lectus arcu bibendum at varius vel pharetra.

Aliquam nulla facilisi cras fermentum odio. Est velit egestas dui id ornare. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Sit amet risus nullam eget felis eget nunc lobortis. Neque ornare aenean euismod elementum nisi quis eleifend. Sed ullamcorper morbi tincidunt ornare. Non enim praesent elementum facilisis leo vel fringilla. Amet dictum sit amet justo donec enim diam. Consectetur adipiscing elit duis tristique sollicitudin. Consequat id porta nibh venenatis cras sed felis. Viverra tellus in hac habitasse. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Faucibus purus in massa tempor nec. Interdum posuere lorem ipsum dolor sit amet consectetur. Facilisi cras fermentum odio eu feugiat. Arcu ac tortor dignissim convallis aenean et tortor at. Nascetur ridiculus mus mauris vitae ultricies leo.

Adipiscing elit duis tristique sollicitudin nibh sit. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Adipiscing elit duis tristique sollicitudin nibh. Aliquam etiam erat velit scelerisque in dictum. Tristique magna sit amet purus gravida quis blandit turpis cursus. Fermentum leo vel orci porta non. Et sollicitudin ac orci phasellus. Arcu dui vivamus arcu felis. Dignissim suspendisse in est ante in nibh mauris cursus. Sit amet nisl purus in mollis nunc sed id. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Duis convallis convallis tellus id. Mauris pharetra et ultrices neque ornare aenean euismod. Aliquet porttitor lacus luctus accumsan tortor posuere.

Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Eu turpis egestas pretium aenean. Justo eget magna fermentum iaculis eu non diam. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Malesuada fames ac turpis egestas sed tempus urna et. Cras sed felis eget velit aliquet sagittis id consectetur. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Malesuada fames ac turpis egestas maecenas pharetra. Magnis dis parturient montes nascetur ridiculus mus mauris. Molestie ac feugiat sed lectus vestibulum mattis. Ac orci phasellus egestas tellus. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Morbi non arcu risus quis varius. Pulvinar proin gravida hendrerit lectus a. Id velit ut tortor pretium viverra. Mauris pellentesque pulvinar pellentesque habitant morbi. Etiam non quam lacus suspendisse faucibus interdum. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Accumsan lacus vel facilisis volutpat.

Tellus elementum sagittis vitae et leo duis ut diam. Ut eu sem integer vitae justo eget magna. Eu volutpat odio facilisis mauris sit amet massa. Enim nec dui nunc mattis enim. Varius duis at consectetur lorem donec massa sapien. Molestie nunc non blandit massa enim nec. Id donec ultrices tincidunt arcu non sodales neque sodales. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Sit amet nisl suscipit adipiscing. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Facilisis magna etiam tempor orci eu lobortis elementum. Cras sed felis eget velit aliquet sagittis id consectetur.

Porttitor leo a diam sollicitudin tempor id eu. Enim nec dui nunc mattis enim ut tellus elementum. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Quis varius quam quisque id diam. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Auctor urna nunc id cursus. Odio ut sem nulla pharetra diam sit amet. Interdum posuere lorem ipsum dolor. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Libero id faucibus nisl tincidunt eget nullam non. Ut tortor pretium viverra suspendisse potenti. Ullamcorper dignissim cras tincidunt lobortis feugiat. Tristique risus nec feugiat in fermentum. Donec pretium vulputate sapien nec. Est pellentesque elit ullamcorper dignissim cras.

Non odio euismod lacinia at quis risus sed. In iaculis nunc sed augue lacus. Mi sit amet mauris commodo quis imperdiet. Morbi quis commodo odio aenean sed adipiscing diam donec. Pretium fusce id velit ut tortor. Enim blandit volutpat maecenas volutpat. Ultrices vitae auctor eu augue ut. Sociis natoque penatibus et magnis dis. Leo urna molestie at elementum eu. Dictum non consectetur a erat nam at lectus urna. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Sem et tortor consequat id porta. Commodo elit at imperdiet dui accumsan sit amet nulla. Ultrices in iaculis nunc sed augue lacus. Duis convallis convallis tellus id interdum velit laoreet. Duis at consectetur lorem donec massa sapien. Sit amet justo donec enim. Orci eu lobortis elementum nibh.

Nisl nunc mi ipsum faucibus. Arcu dui vivamus arcu felis bibendum. Rhoncus urna neque viverra justo nec ultrices dui sapien. Proin fermentum leo vel orci porta non pulvinar neque. Tincidunt eget nullam non nisi est sit. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Faucibus purus in massa tempor nec feugiat nisl pretium. Amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id volutpat lacus laoreet. Sem integer vitae justo eget magna fermentum. Semper risus in hendrerit gravida. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in hac habitasse platea. Vitae sapien pellentesque habitant morbi tristique senectus et netus et.

Maecenas volutpat blandit aliquam etiam erat velit. Arcu felis bibendum ut tristique et egestas. Varius vel pharetra vel turpis nunc eget lorem. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Ultrices dui sapien eget mi proin. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Sociis natoque penatibus et magnis dis. Vel eros donec ac odio. Pharetra sit amet aliquam id. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Dictum sit amet justo donec enim. Proin fermentum leo vel orci porta. Et magnis dis parturient montes nascetur ridiculus.
`;

export const Scrolling = () => (
  <Modal
    open={boolean('open', true)}
    closeOnBackgroundClick={boolean('closeOnBackgroundClick', false)}
    closeOnEscape={boolean('closeOnEscape', false)}
    heading={text('heading', 'Modal heading')}
    fullWidth={boolean('fullWidth', false)}
    onClose={boolean('has onClose', true) ? action('onClose') : undefined}
    buttonGroup={
      <>
        <Button>Accept</Button>
        <Button buttonStyle="outline">Cancel</Button>
      </>
    }
  >
    <p style={{ whiteSpace: 'pre-wrap' }}>{lorem}</p>
  </Modal>
);

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const increment = () => setSeconds(prev => prev + 1);
    const timer = window.setInterval(increment, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  return (
    <p>
      Time passed: {seconds} second{seconds === 1 ? '' : 's'}
    </p>
  );
};

export const UnmountExample = () => {
  const noUnmount = boolean('noUnmount', false);
  return (
    <Modal
      open={boolean('open', true)}
      onClose={action('onClose')}
      noUnmount={noUnmount}
      heading={noUnmount ? 'noUnmount true, time will persist' : 'noUnmount false, time will reset'}
    >
      <Timer />
    </Modal>
  );
};
