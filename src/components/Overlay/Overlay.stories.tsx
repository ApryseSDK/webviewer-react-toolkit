import { boolean } from '@storybook/addon-knobs';
import React, { CSSProperties } from 'react';
import { Overlay } from '../Overlay';
import readme from './README.md';

export default { title: 'Components/Overlay', component: Overlay, parameters: { readme } };

const style: CSSProperties = {
  backgroundColor: 'lightblue',
  color: 'black',
  margin: 32,
  padding: 32,
  textAlign: 'center',
};

export const Basic = () => {
  const mounted = boolean('mounted', true);
  const darkOverlay = boolean('darkOverlay', false);
  const blockClicks = boolean('blockClicks', false);
  return (
    <>
      {mounted && (
        <Overlay darkOverlay={darkOverlay} blockClicks={blockClicks}>
          <div style={style}>Overlay #1</div>
        </Overlay>
      )}
    </>
  );
};

export const Multiple = () => {
  const mounted1 = boolean('#1 mounted', true);
  const darkOverlay1 = boolean('#1 darkOverlay', false);
  const blockClicks1 = boolean('#1 blockClicks', false);

  const mounted2 = boolean('#2 mounted', true);
  const darkOverlay2 = boolean('#2 darkOverlay', false);
  const blockClicks2 = boolean('#2 blockClicks', false);

  return (
    <>
      {mounted1 && (
        <Overlay darkOverlay={darkOverlay1} blockClicks={blockClicks1}>
          <div style={style}>Overlay #1</div>
        </Overlay>
      )}
      {mounted2 && (
        <Overlay darkOverlay={darkOverlay2} blockClicks={blockClicks2}>
          <div style={style}>Overlay #2</div>
        </Overlay>
      )}
    </>
  );
};
