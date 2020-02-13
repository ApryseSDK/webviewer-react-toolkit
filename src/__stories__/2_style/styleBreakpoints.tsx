import React, { useCallback, useEffect, useState } from 'react';
import font from '../../storybook-helpers/theme/font';
import breakpointRange from './generated/breakpointRange';
import breakpoints from './generated/breakpoints';
import { style } from './styles';
import { copy } from './utils';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export function Mixins({ index }: { index: number }) {
  const mixin = breakpoints[index];
  return (
    <div style={{ ...style, whiteSpace: 'pre', marginBottom: -16 }} onClick={copy(mixin)}>
      {mixin}
    </div>
  );
}

export function Breakpoints() {
  const [width, _setWidth] = useState(window.document.documentElement.clientWidth);
  const setWidth = useCallback(() => {
    _setWidth(window.document.documentElement.clientWidth);
  }, []);

  const [valid, setValid] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const newValid: { [key: string]: boolean } = {};
    breakpointRange.forEach(({ params, max, min }) => {
      if (max && width <= max) {
        newValid[params] = true;
      } else if (min && width >= min) {
        newValid[params] = true;
      }
    });
    setValid(newValid);
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', setWidth);
    return () => window.removeEventListener('resize', setWidth);
  }, [setWidth]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 40,
        fontFamily: font.fontCode,
        color: '#ebebeb',
      }}
    >
      <div style={{ fontSize: 14, padding: 4 }}>Current width: {width}px</div>
      {breakpointRange.map(({ params, max, min }) => {
        const isValid = valid[params];
        const background = '#333';
        const rangeColor = isValid ? 'rgba(200,255,200,0.2)' : 'rgba(255,200,200,0.1)';

        return (
          <div
            key={params}
            style={{
              backgroundColor: min ? rangeColor : background,
              width: `100vw`,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: max ? rangeColor : background,
                width: max || min,
                display: 'flex',
                justifyContent: 'center',
                color: isValid ? 'lightgreen' : 'lightcoral',
              }}
            >
              {params} ({min ? `${min}px - ∞` : `0px - ${max}px`}) {isValid ? '✅' : '❌'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
