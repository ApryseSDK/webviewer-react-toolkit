import { StoryContext, StoryFn } from '@storybook/addons';
import React, { useLayoutEffect, useRef, useState } from 'react';

export function withTheme<StoryFnReturnType>(storyFn: StoryFn<StoryFnReturnType>, context: StoryContext) {
  return (
    <>
      <ThemeChangeButton id="playground-theme-button" />
      {storyFn(context)}
    </>
  );
}

export interface ThemeChangeButtonProps {
  className?: string;
  onClick?: (darkTheme: boolean) => void;
  id?: string;
}

export function isDarkThemeStored() {
  const storedTheme = localStorage.getItem('data-theme') || '';
  return storedTheme === 'dark';
}

export function ThemeChangeButton({ className, onClick, id }: ThemeChangeButtonProps) {
  const html = useRef(document.documentElement);

  const [darkTheme, setDarkTheme] = useState(isDarkThemeStored);

  useLayoutEffect(() => {
    const newTheme = darkTheme ? 'dark' : '';
    html.current.setAttribute('data-theme', newTheme);
    setTimeout(() => localStorage.setItem('data-theme', newTheme));
  }, [darkTheme]);

  const handleOnClick = () => {
    setDarkTheme(t => {
      onClick?.(!t);
      return !t;
    });
  };

  return (
    <div
      id={id}
      className={className}
      onClick={handleOnClick}
      title={`Change to ${darkTheme ? 'light' : 'dark'} theme`}
    >
      {darkTheme ? '☀️' : '🌙'}
    </div>
  );
}
