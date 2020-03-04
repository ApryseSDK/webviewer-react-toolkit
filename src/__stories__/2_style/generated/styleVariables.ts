export default {
  colors: {
    theme: [
      {
        scss: '$color-theme-primary',
        css: 'var(--color-theme-primary)',
        value: '#00a5e4',
        dark: '#00a5e4',
      },
      {
        scss: '$color-theme-secondary',
        css: 'var(--color-theme-secondary)',
        value: '#242933',
        dark: '#8fa5c7',
      },
    ],
    font: [
      {
        scss: '$color-font-primary',
        css: 'var(--color-font-primary)',
        value: '#232229',
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
        value: '#fff',
        dark: '#4a4a4a',
      },
      {
        scss: '$color-gray-2',
        css: 'var(--color-gray-2)',
        value: '#f4f4f4',
        dark: '#444',
      },
      {
        scss: '$color-gray-3',
        css: 'var(--color-gray-3)',
        value: '#ddd',
        dark: '#3f3f3f',
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
        dark: '#9098b3',
      },
      {
        scss: '$color-blue-gray-5',
        css: 'var(--color-blue-gray-5)',
        value: '#6077bf',
        dark: '#aab1cf',
      },
      {
        scss: '$color-blue-gray-6',
        css: 'var(--color-blue-gray-6)',
        value: '#415797',
        dark: '#9098b3',
      },
    ],
    contrast: [
      {
        scss: '$color-contrast-1',
        css: 'var(--color-contrast-1)',
        value: '#fafafa',
        dark: '#101010',
      },
      {
        scss: '$color-contrast-2',
        css: 'var(--color-contrast-2)',
        value: '#f0f0f0',
        dark: '#1a1a1a',
      },
    ],
    message: [
      {
        scss: '$color-message-info',
        css: 'var(--color-message-info)',
        value: '#2980b9',
        dark: '#2980b9',
      },
      {
        scss: '$color-message-success',
        css: 'var(--color-message-success)',
        value: '#27ae60',
        dark: '#27ae60',
      },
      {
        scss: '$color-message-warning',
        css: 'var(--color-message-warning)',
        value: '#e67e22',
        dark: '#e67e22',
      },
      {
        scss: '$color-message-error',
        css: 'var(--color-message-error)',
        value: '#e74c3c',
        dark: '#e74c3c',
      },
      {
        scss: '$color-message-info-focus-shadow',
        css: 'var(--color-message-info-focus-shadow)',
        value: 'rgba(41, 128, 185, 0.4)',
        dark: 'rgba(41, 128, 185, 0.4)',
      },
      {
        scss: '$color-message-success-focus-shadow',
        css: 'var(--color-message-success-focus-shadow)',
        value: 'rgba(39, 174, 96, 0.4)',
        dark: 'rgba(39, 174, 96, 0.4)',
      },
      {
        scss: '$color-message-warning-focus-shadow',
        css: 'var(--color-message-warning-focus-shadow)',
        value: 'rgba(230, 126, 34, 0.4)',
        dark: 'rgba(230, 126, 34, 0.4)',
      },
      {
        scss: '$color-message-error-focus-shadow',
        css: 'var(--color-message-error-focus-shadow)',
        value: 'rgba(231, 76, 60, 0.4)',
        dark: 'rgba(231, 76, 60, 0.4)',
      },
    ],
    other: [
      {
        scss: '$color-background-canvas',
        css: 'var(--color-background-canvas)',
        value: '#eee',
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
      value: '8px',
      dark: '8px',
    },
    {
      scss: '$padding-medium',
      css: 'var(--padding-medium)',
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
    {
      scss: '$padding-huge',
      css: 'var(--padding-huge)',
      value: '32px',
      dark: '32px',
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
  boxShadow: [
    {
      scss: '$box-shadow-1',
      css: 'var(--box-shadow-1)',
      value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      dark: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    },
    {
      scss: '$box-shadow-2',
      css: 'var(--box-shadow-2)',
      value: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      dark: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    },
    {
      scss: '$box-shadow-3',
      css: 'var(--box-shadow-3)',
      value: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      dark: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  ],
  focus: [
    {
      scss: '$focus-transition',
      css: 'var(--focus-transition)',
      value: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
      dark: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
    },
  ],
  fontFamily: [
    {
      scss: '$font-family',
      css: 'var(--font-family)',
      value: 'Lato, Tahoma, sans-serif',
      dark: 'Lato, Tahoma, sans-serif',
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
  other: [],
};
