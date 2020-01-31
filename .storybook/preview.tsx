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
    maxPropArrayLength: 1,
    TableComponent: () => null,
    styles: (base: any) => ({
      ...base,
      // The wrapper around info.
      infoBody: { padding: 15, backgroundColor: 'rgb(51, 51, 51)' },
      // The wrapper around the story.
      infoStory: { padding: 40 },
      // Hide prop table header.
      propTableHead: { display: 'none' },
    }),
  }),
);
addDecorator(withKnobs);
addDecorator(withA11y);

/* --- Add global parameters. --- */

addParameters({
  // TODO: Move `options` to `manager.js` once it's supported more.
  options: {
    theme,
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true,
  },
  // Default to show Docs page whenever anyone switches components.
  viewMode: 'docs',
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        {/* <Primary /> */}
        <Props />
      </>
    ),

    // Since we do not add component description in code (instead inserting it
    // into a .md file) we extract it using the following.
    extractComponentDescription: (_c: unknown, { info }: { info: string | { info?: string; text?: string } }) => {
      if (typeof info === 'string') return info;
      if (info.info) return info.info;
      if (info.text) return info.text;
      return null;
    },

    // prepareForInline: (s: StoryFn) => <div>{s}</div>,
  },
});
