import React, { CSSProperties, MouseEvent, ReactElement, useEffect, useState } from 'react';
import font from '../../storybook-helpers/theme/font';
import { Remove } from '../../utils';
import mixins from './mixins';
import styleVariables from './styleVariables';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

/* --- Utils. --- */

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (!successful) throw new Error();
    alert(`Copied value: ${text}`);
  } catch (err) {
    console.error('Could not copy text: ', err);
  }

  document.body.removeChild(textArea);
}

function copy(text: string) {
  return (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(text);
    }
    navigator.clipboard.writeText(text).then(
      () => alert(`Copied value: ${text}`),
      err => console.error('Could not copy text: ', err),
    );
  };
}

/* --- Styles. --- */

const style: CSSProperties = {
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
const dividerStyle: CSSProperties = {
  ...style,
  cursor: 'default',
  backgroundColor: 'transparent',
  color: style.backgroundColor,
  fontFamily: font.fontBase,
  justifyContent: 'center',
};
const prefixStyle: CSSProperties = {
  ...dividerStyle,
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: -8,
  justifyContent: 'flex-end',
};
const titleStyle: CSSProperties = {
  fontFamily: font.fontBase,
  margin: '20px 0 8px',
  padding: 0,
  position: 'relative',
  color: 'rgba(240,240,255,0.9)',
  fontSize: 20,
};

/* --- Variables. --- */

function getTitle(group: string) {
  let words = group.split(/(?=[A-Z])/);
  words = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(' ');
}

export function Groups() {
  const keys = Object.keys(styleVariables).filter(k => k !== 'colors');

  const [tick, setTick] = useState(false);
  useEffect(() => {
    setTimeout(() => setTick(!tick), 2000);
  }, [tick]);

  let groups: ReactElement[] = [];

  keys.forEach(k => {
    const group = styleVariables[k as keyof Remove<typeof styleVariables, 'colors'>];
    groups.push(
      <h2 key={k} style={{ ...titleStyle, gridColumn: '1 / last-line' }}>
        {getTitle(k)}
      </h2>,
    );
    groups = [
      ...groups,
      ...group.map(({ scss, css, value }) => {
        const valueStyle: CSSProperties = {
          ...style,
          ...(['fontSize', 'fontWeight', 'padding', 'borderRadius'].includes(k) ? { [k]: value } : undefined),
          boxShadow:
            k === 'padding'
              ? `inset 0px 0px 0px ${value} rgba(0,50,0,0.1)`
              : scss === '$focus-transition' && tick
              ? `0 0 0 2px rgba(20, 110, 170, 0.4)`
              : undefined,
          transition: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
        };
        const truncate: CSSProperties = {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          minWidth: 0,
        };
        return (
          <React.Fragment key={scss}>
            <div style={prefixStyle}>Sass:</div>
            <div style={style} onClick={copy(scss)}>
              <div style={truncate}>{scss}</div>
            </div>

            <div style={dividerStyle}>or</div>
            <div style={prefixStyle}>CSS:</div>
            <div style={style} onClick={copy(css)}>
              <div style={truncate}>{css}</div>
            </div>

            <div style={dividerStyle}>=</div>
            <div style={prefixStyle}>Value:</div>
            <div style={valueStyle} onClick={copy(value)}>
              <div style={truncate}>{value}</div>
            </div>
          </React.Fragment>
        );
      }),
    ];
  });

  return (
    <div
      style={{
        marginTop: -20,
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(7, auto)',
        fontSize: 12,
        alignItems: 'center',
      }}
    >
      {groups}
    </div>
  );
}

/* --- Colors. --- */

const colorButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
  padding: '2px 4px',
  color: 'black',
  cursor: 'pointer',
};

export function Theme() {
  const keys = Object.keys(styleVariables.colors);

  const groups: ReactElement[] = [];

  keys.forEach(k => {
    groups.push(
      <h2 key={k} style={{ ...titleStyle, gridColumn: '1 / last-line' }}>
        {getTitle(k)}
      </h2>,
    );

    const colors = styleVariables.colors[k as keyof typeof styleVariables['colors']];
    groups.push(
      <div
        key={k + 'colors'}
        style={{
          margin: '16px 0',
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat( auto-fit, 236px )',
        }}
      >
        {colors.map(({ scss, css, value }) => (
          <div key={css} style={{ fontSize: 11, fontFamily: font.fontCode }}>
            <div
              style={{
                display: 'flex',
                padding: 8,
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '4px solid white',
                borderRadius: 8,
                backgroundColor: value,
                height: 110,
                width: 210,
                flexShrink: 1,
              }}
            >
              <div style={{ ...colorButtonStyle, position: 'absolute', top: 8, left: 8 }} onClick={copy(value)}>
                {value}
              </div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                <div style={{ ...colorButtonStyle, marginBottom: 4 }} onClick={copy(scss)}>
                  {scss}
                </div>
                <div style={colorButtonStyle} onClick={copy(css)}>
                  {css}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>,
    );
  });

  return <div>{groups}</div>;
}

/* --- Mixins. --- */

export function Mixins({ index }: { index: number }) {
  const mixin = mixins[index];
  return (
    <div style={{ ...style, whiteSpace: 'pre', marginBottom: -16 }} onClick={copy(mixin)}>
      {mixin}
    </div>
  );
}
