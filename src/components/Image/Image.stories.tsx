import React, { CSSProperties } from 'react';
import { Image } from '../Image';
import { Spinner } from '../Spinner';
import readme from './README.md';
import { boolean } from '@storybook/addon-knobs';

export default { title: 'Components/Image', component: Image, parameters: { readme } };

const style: CSSProperties = {
  height: 250,
  width: 250,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightgray',
};

const IMAGE =
  'https://www.webfx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png';

export const Basic = () => (
  <div style={style}>
    <Image src={IMAGE} onRenderLoading={() => <Spinner />} pending={boolean('pending', false)} />
  </div>
);

export const WithSrcPromise = () => (
  <div style={style}>
    <Image src={new Promise((res) => setTimeout(() => res(IMAGE), 500))} onRenderLoading={() => <Spinner />} />
  </div>
);

export const SrcPromiseRejects = () => (
  <div style={style}>
    <Image
      src={new Promise((rej) => setTimeout(() => rej(), 500))}
      onRenderLoading={() => <Spinner />}
      onRenderFallback={() => 'Rejected source promise'}
      pending={boolean('pending', false)}
    />
  </div>
);

export const SrcPromiseReturnsFalsy = () => (
  <div style={style}>
    <Image
      src={new Promise((res) => setTimeout(() => res(''), 500))}
      onRenderLoading={() => <Spinner />}
      onRenderFallback={() => 'Falsy source'}
      pending={boolean('pending', false)}
    />
  </div>
);
