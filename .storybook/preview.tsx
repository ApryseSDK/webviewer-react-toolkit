import { withA11y } from '@storybook/addon-a11y';
import { Description, Props, Subtitle, Title } from '@storybook/addon-docs/dist/blocks';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import '../src/index.scss';
import './style.scss';
import theme from './theme';

/* --- Add global decorators. --- */

addDecorator(
  // TODO: Remove once features are supported in docs.
  // @ts-ignore
  withInfo({
    inline: true,
    header: false,
    TableComponent: () => null,
    styles: (base: any) => ({
      ...base,
      // The wrapper around info.
      infoBody: { padding: 15, backgroundColor: 'rgb(51, 51, 51)' },
      // The wrapper around the story.
      infoStory: { padding: 15 },
      // Hide prop table header.
      propTableHead: { display: 'none' },
    }),
  }),
);
addDecorator(withKnobs);
addDecorator(withA11y);

/* --- Add global parameters. --- */

addParameters({
  // TODO: Required cause they broke types...
  info: {},
  // TODO: Move `options` to `manager.js` once it's supported more.
  options: { panelPosition: 'right', theme },
  backgrounds: [
    { name: 'canvas', value: '#eff5f5', default: true },
    { name: 'dark-canvas', value: '#161625' },
  ],
  grid: { cellSize: 8 },
  docs: {
    // Remove primary and stories until they allow props and show correct
    // code previews.
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        {/* <Primary /> */}
        <Props />
        {/* <Stories /> */}
      </>
    ),

    // Since we do not add component description in code (instead inserting it
    // into a .md file) we extract it using the following.
    extractComponentDescription: (_c: unknown, { info }: { info: string | { docs?: string; text?: string } }) => {
      if (typeof info === 'string') return info;
      if (info.docs) return info.docs;
      if (info.text) return info.text;
      return null;
    },

    // Use this if showing inline stories in docs. Will limit the height of the
    // container to prevent expanding too big.
    // prepareForInline: Story => (
    //   <div style={{ maxHeight: 500, height: '100%' }}>
    //     <Story />
    //   </div>
    // ),
  },
});
