import { CSSProperties } from 'react';
import font from '../../storybook-helpers/theme/font';

/* --- Styles. --- */

export const style: CSSProperties = {
  userSelect: 'none',
  padding: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontFamily: font.fontCode,
  fontSize: 12,
  overflow: 'hidden',
};

export const dividerStyle: CSSProperties = {
  ...style,
  cursor: 'default',
  backgroundColor: 'transparent',
  color: style.backgroundColor,
  fontFamily: font.fontBase,
  justifyContent: 'center',
};

export const prefixStyle: CSSProperties = {
  ...dividerStyle,
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: -8,
  justifyContent: 'flex-end',
};

export const titleStyle: CSSProperties = {
  fontFamily: font.fontBase,
  margin: '20px 0 8px',
  padding: 0,
  position: 'relative',
  color: 'rgba(240,240,255,0.9)',
  fontSize: 20,
};
