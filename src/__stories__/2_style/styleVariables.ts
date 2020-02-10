export default {
  colors: {
    theme: [
      {
        scss: '$color-theme-primary',
        css: 'var(--color-theme-primary)',
        value: '#00a3e3',
        dark: '#9a97f3',
      },
      {
        scss: '$color-theme-secondary',
        css: 'var(--color-theme-secondary)',
        value: '#131416',
        dark: '#818cab',
      },
    ],
    font: [
      {
        scss: '$color-font-primary',
        css: 'var(--color-font-primary)',
        value: '#292922',
        dark: '#ebebeb',
      },
      {
        scss: '$color-font-secondary',
        css: 'var(--color-font-secondary)',
        value: '#424242',
        dark: '#989ba3',
      },
    ],
    gray: [
      {
        scss: '$color-gray-1',
        css: 'var(--color-gray-1)',
        value: '#eee',
        dark: '#333',
      },
      {
        scss: '$color-gray-2',
        css: 'var(--color-gray-2)',
        value: '#ddd',
        dark: '#444',
      },
    ],
    blueGray: [
      {
        scss: '$color-blue-gray-1',
        css: 'var(--color-blue-gray-1)',
        value: '#dfe2ed',
        dark: '#46506d',
      },
      {
        scss: '$color-blue-gray-2',
        css: 'var(--color-blue-gray-2)',
        value: '#c3c6d4',
        dark: '#525e80',
      },
      {
        scss: '$color-blue-gray-3',
        css: 'var(--color-blue-gray-3)',
        value: '#abb0c4',
        dark: '#6d7485',
      },
      {
        scss: '$color-blue-gray-4',
        css: 'var(--color-blue-gray-4)',
        value: '#8b92ab',
        dark: '#7d83a1',
      },
      {
        scss: '$color-blue-gray-5',
        css: 'var(--color-blue-gray-5)',
        value: '#767f9b',
        dark: '#9098b3',
      },
      {
        scss: '$color-blue-gray-6',
        css: 'var(--color-blue-gray-6)',
        value: '#6077bf',
        dark: '#aab1cf',
      },
      {
        scss: '$color-blue-gray-7',
        css: 'var(--color-blue-gray-7)',
        value: '#415797',
        dark: '#c6ceec',
      },
    ],
    contrast: [
      {
        scss: '$color-contrast-1',
        css: 'var(--color-contrast-1)',
        value: '#fff',
        dark: '#111',
      },
      {
        scss: '$color-contrast-2',
        css: 'var(--color-contrast-2)',
        value: '#fafafa',
        dark: '#191919',
      },
      {
        scss: '$color-contrast-3',
        css: 'var(--color-contrast-3)',
        value: '#f0f0f0',
        dark: '#222',
      },
    ],
    other: [
      {
        scss: '$color-background-canvas',
        css: 'var(--color-background-canvas)',
        value: '#eff5f5',
        dark: '#333',
      },
      {
        scss: '$color-focus-shadow',
        css: 'var(--color-focus-shadow)',
        value: 'rgba(20, 110, 170, 0.4)',
        dark: 'rgba(32, 162, 255, 0.4)',
      },
      {
        scss: '$color-overlay-canvas',
        css: 'var(--color-overlay-canvas)',
        value: 'rgba(0, 0, 0, 0.4)',
        dark: 'rgba(0, 0, 0, 0.4)',
      },
    ],
  },
  fontSize: [
    {
      scss: '$font-size-tiny',
      css: 'var(--font-size-tiny)',
      value: '9px',
      dark: '9px',
    },
    {
      scss: '$font-size-small',
      css: 'var(--font-size-small)',
      value: '11px',
      dark: '11px',
    },
    {
      scss: '$font-size-default',
      css: 'var(--font-size-default)',
      value: '13px',
      dark: '13px',
    },
    {
      scss: '$font-size-medium',
      css: 'var(--font-size-medium)',
      value: '16px',
      dark: '16px',
    },
    {
      scss: '$font-size-large',
      css: 'var(--font-size-large)',
      value: '18px',
      dark: '18px',
    },
    {
      scss: '$font-size-huge',
      css: 'var(--font-size-huge)',
      value: '24px',
      dark: '24px',
    },
  ],
  fontWeight: [
    {
      scss: '$font-weight-normal',
      css: 'var(--font-weight-normal)',
      value: '400',
      dark: '400',
    },
    {
      scss: '$font-weight-bold',
      css: 'var(--font-weight-bold)',
      value: '700',
      dark: '700',
    },
  ],
  padding: [
    {
      scss: '$padding-tiny',
      css: 'var(--padding-tiny)',
      value: '4px',
      dark: '4px',
    },
    {
      scss: '$padding-small',
      css: 'var(--padding-small)',
      value: '12px',
      dark: '12px',
    },
    {
      scss: '$padding',
      css: 'var(--padding)',
      value: '16px',
      dark: '16px',
    },
    {
      scss: '$padding-large',
      css: 'var(--padding-large)',
      value: '24px',
      dark: '24px',
    },
  ],
  borderRadius: [
    {
      scss: '$border-radius-small',
      css: 'var(--border-radius-small)',
      value: '2px',
      dark: '2px',
    },
    {
      scss: '$border-radius',
      css: 'var(--border-radius)',
      value: '4px',
      dark: '4px',
    },
    {
      scss: '$border-radius-large',
      css: 'var(--border-radius-large)',
      value: '8px',
      dark: '8px',
    },
  ],
  breakpoint: [
    {
      scss: '$breakpoint-tablet',
      css: 'var(--breakpoint-tablet)',
      value: '768px',
      dark: '768px',
    },
    {
      scss: '$breakpoint-desktop',
      css: 'var(--breakpoint-desktop)',
      value: '1024px',
      dark: '1024px',
    },
  ],
  zIndex: [
    {
      scss: '$z-index-local',
      css: 'var(--z-index-local)',
      value: '0',
      dark: '0',
    },
    {
      scss: '$z-index-raised',
      css: 'var(--z-index-raised)',
      value: '100',
      dark: '100',
    },
    {
      scss: '$z-index-dragging',
      css: 'var(--z-index-dragging)',
      value: '200',
      dark: '200',
    },
    {
      scss: '$z-index-overlay',
      css: 'var(--z-index-overlay)',
      value: '300',
      dark: '300',
    },
  ],
  other: [
    {
      scss: '$focus-transition',
      css: 'var(--focus-transition)',
      value: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
      dark: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
    },
  ],
};
