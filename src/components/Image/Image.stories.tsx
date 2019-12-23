import { boolean } from '@storybook/addon-knobs';
import React, { CSSProperties } from 'react';
import Image from '../Image';
import Spinner from '../Spinner';
import docs from './README.md';

export default { title: 'Image', parameters: { info: docs } };

const style: CSSProperties = {
  height: 250,
  width: 250,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightgray',
};

export const basic = () => (
  <div style={style}>
    <Image
      src={
        'https://www.webfx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png'
      }
      onRenderLoading={() => <Spinner />}
      loading={boolean('loading', false)}
    />
  </div>
);

export const withPromiseSrc = () => (
  <div style={style}>
    <Image
      src={
        new Promise(res =>
          setTimeout(
            () =>
              res(
                'https://www.webfx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png',
              ),
            500,
          ),
        )
      }
      onRenderLoading={() => <Spinner />}
      loading={boolean('loading', false)}
    />
  </div>
);
