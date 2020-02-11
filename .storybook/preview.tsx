import { Description, Props, Subtitle, Title } from '@storybook/addon-docs/dist/blocks';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import './style.scss';
import theme from './theme';
import { withTheme } from './withTheme';

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
addDecorator(withTheme);

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
  // Default to show "story" vs "docs" whenever story switches.
  viewMode: 'story',
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
    extractComponentDescription: (_c: unknown, { readme }: { readme: string }) => {
      if (readme) return readme;
      return null;
    },

    // prepareForInline: (s: StoryFn) => <div>{s}</div>,
  },
});
