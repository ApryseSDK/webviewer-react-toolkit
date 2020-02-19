import React, { CSSProperties } from 'react';
import font from '../../storybook-helpers/theme/font';
const version = require('../../../package.json').version;

export function Version() {
  return <span>{version}</span>;
}

export function Current(props: { text: string }) {
  const style: CSSProperties = {
    fontFamily: font.fontBase,
    margin: 0,
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitOverflowScrolling: 'touch',
    fontSize: 14,
    color: '#00a3e3',
    textDecoration: 'none',
  };

  return (
    <a
      style={style}
      href={`https://github.com/PDFTron/webviewer-react-toolkit/releases/tag/v${version}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.text || version}
    </a>
  );
}
