import { boolean } from '@storybook/addon-knobs';
import React, { CSSProperties } from 'react';
import { Overlay } from '../Overlay';
import info from './README.md';

export default { title: 'Components/Overlay', component: Overlay, parameters: { info } };

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
  const allowClickThrough = boolean('allowClickThrough', false);
  return (
    <>
      {mounted && (
        <Overlay darkOverlay={darkOverlay} allowClickThrough={allowClickThrough}>
          <div style={style}>Overlay #1</div>
        </Overlay>
      )}
    </>
  );
};

export const Multiple = () => {
  const mounted1 = boolean('#1 mounted', true);
  const darkOverlay1 = boolean('#1 darkOverlay', false);
  const allowClickThrough1 = boolean('#1 allowClickThrough', false);

  const mounted2 = boolean('#2 mounted', true);
  const darkOverlay2 = boolean('#2 darkOverlay', false);
  const allowClickThrough2 = boolean('#2 allowClickThrough', false);

  return (
    <>
      {mounted1 && (
        <Overlay darkOverlay={darkOverlay1} allowClickThrough={allowClickThrough1}>
          <div style={style}>Overlay #1</div>
        </Overlay>
      )}
      {mounted2 && (
        <Overlay darkOverlay={darkOverlay2} allowClickThrough={allowClickThrough2}>
          <div style={style}>Overlay #2</div>
        </Overlay>
      )}
    </>
  );
};
