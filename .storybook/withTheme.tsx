import { StoryContext, StoryFn } from '@storybook/addons';
import React, { useRef, useState } from 'react';

export function withTheme<StoryFnReturnType>(storyFn: StoryFn<StoryFnReturnType>, context: StoryContext) {
  const html = useRef(document.documentElement);

  const [theme, setTheme] = useState<'' | 'dark'>(() =>
    html.current.getAttribute('data-theme') === 'dark' ? 'dark' : '',
  );
  const toggleTheme = () => {
    const dark = html.current.getAttribute('data-theme') === 'dark';
    const newTheme = dark ? '' : 'dark';
    html.current.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      <div id="playground-theme-button" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </div>
      {storyFn(context)}
    </>
  );
}
