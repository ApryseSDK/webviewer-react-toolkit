import React, { CSSProperties, ReactElement, useEffect, useMemo, useState } from 'react';
import { isDarkThemeStored, ThemeChangeButton } from '../../../.storybook/withTheme';
import { ToastProvider } from '../../components';
import font from '../../storybook-helpers/theme/font';
import { Remove } from '../../utils';
import mixins from './generated/mixins';
import styleVariables from './generated/styleVariables';
import { dividerStyle, prefixStyle, style, titleStyle } from './styles';
import { getTitle, useCopy } from './utils';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

/* --- Variables. --- */

const colorFocusShadow = styleVariables.colors.other.find((c) => c.scss === '$color-focus-shadow')?.dark;

function _Groups() {
  const copy = useCopy();

  const keys = Object.keys(styleVariables).filter((k) => k !== 'colors');

  const [tick, setTick] = useState(false);
  useEffect(() => {
    setTimeout(() => setTick(!tick), 500);
  }, [tick]);

  let groups: ReactElement[] = [];

  keys.forEach((k) => {
    const group: { scss: string; css: string; value: string; dark: string; }[] =
      styleVariables[k as keyof Remove<(typeof styleVariables), 'colors'>];
    if (!group.length) return;

    groups.push(
      <h2 key={k} style={{ ...titleStyle, gridColumn: '1 / last-line' }}>
        {getTitle(k)}
      </h2>,
    );
    groups = [
      ...groups,
      ...group.map(({ scss, css, value }) => {
        const transition = scss === '$focus-transition' ? value : undefined;
        const valueStyle: CSSProperties = {
          ...style,
          ...(['fontSize', 'fontWeight', 'padding', 'borderRadius'].includes(k) ? { [k]: value } : undefined),
          boxShadow:
            k === 'padding'
              ? `inset 0px 0px 0px ${value} rgba(0,50,0,0.1)`
              : scss === '$focus-transition' && tick
                ? colorFocusShadow && `0 0 0 2px ${colorFocusShadow}`
                : k === 'boxShadow'
                  ? value
                  : undefined,
          transition,
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

export const Groups = () => (
  <ToastProvider>
    <_Groups />
  </ToastProvider>
);

/* --- Colors. --- */

const colorButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
  padding: '2px 4px',
  color: 'black',
  cursor: 'pointer',
};

function _Theme() {
  const copy = useCopy();

  const keys = Object.keys(styleVariables.colors);

  const groups: ReactElement[] = [];

  const [darkTheme, setDarkTheme] = useState(isDarkThemeStored);

  const [lightCanvas, darkCanvas, lightFont, darkFont] = useMemo(() => {
    const canvas = styleVariables.colors.other.find((c) => c.scss === '$color-background-canvas');
    const font = styleVariables.colors.font.find((c) => c.scss === '$color-font-primary');
    const light = canvas?.value;
    const dark = canvas?.dark;
    const lightFont = font?.value;
    const darkFont = font?.dark;
    return [light, dark, lightFont, darkFont];
  }, []);

  keys.forEach((k) => {
    const colors: { scss: string; css: string; value: string; dark: string; }[] =
      styleVariables.colors[k as keyof typeof styleVariables['colors']];
    if (!colors.length) return;

    groups.push(
      <h2 key={k} style={{ ...titleStyle, gridColumn: '1 / last-line', color: darkTheme ? darkFont : lightFont }}>
        {getTitle(k)}
      </h2>,
    );

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
        {colors.map(({ scss, css, value, dark }) => (
          <div key={css} style={{ fontSize: 11, fontFamily: font.fontCode }}>
            <div
              style={{
                display: 'flex',
                padding: 8,
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: `1px solid ${darkTheme ? lightCanvas : darkCanvas}`,
                borderRadius: 4,
                backgroundColor: darkTheme ? dark : value,
                height: 110,
                width: 210,
                flexShrink: 1,
              }}
            >
              <div
                style={{ ...colorButtonStyle, position: 'absolute', top: 8, left: 8 }}
                onClick={copy(darkTheme ? dark : value)}
              >
                {darkTheme ? dark : value}
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

  return (
    <>
      <div className="colors__theme">
        <ThemeChangeButton className="colors__theme__button" onClick={setDarkTheme} />
      </div>
      <div
        style={{
          borderRadius: 4,
          padding: 20,
          border: '1px solid rgba(255,255,255,.1)',
          boxShadow: 'rgba(0,0,0,0.20) 0 2px 5px 0',
          backgroundColor: darkTheme ? darkCanvas : lightCanvas,
        }}
      >
        {groups}
      </div>
    </>
  );
}

export const Theme = () => (
  <ToastProvider>
    <_Theme />
  </ToastProvider>
);

/* --- Mixins. --- */

export function Mixins({ index }: { index: number; }) {
  const copy = useCopy();

  const mixin = mixins[index];
  return (
    <div style={{ ...style, whiteSpace: 'pre', marginBottom: -16 }} onClick={copy(mixin)}>
      {mixin}
    </div>
  );
}
