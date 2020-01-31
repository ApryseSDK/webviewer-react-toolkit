// @ts-ignore
import Link from '@storybook/addon-links/react';
import React, { FC } from 'react';

export const LinkTo: FC<{ title: string; story?: string }> = ({ children, title, story = 'page' }) => {
  return (
    <Link
      style={{ cursor: 'pointer', display: 'inline', color: '#00a3e3', textDecoration: 'none' }}
      kind={title}
      story={story}
    >
      {children}
    </Link>
  );
};
