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
  return (
    <>
      {mounted && (
        <Overlay>
          <div style={style}>Overlay #1</div>
        </Overlay>
      )}
    </>
  );
};

export const Multiple = () => {
  const mounted1 = boolean('#1 mounted', true);

  const mounted2 = boolean('#2 mounted', true);

  return (
    <>
      {mounted1 ? (
        <Overlay>
          <div style={style}>Overlay #1</div>
        </Overlay>
      ) : undefined}
      {mounted2 ? (
        <Overlay>
          <div style={style}>Overlay #2</div>
        </Overlay>
      ) : undefined}
    </>
  );
};
