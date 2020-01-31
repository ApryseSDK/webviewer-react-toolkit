export default {
  colors: {
    theme: [
      {
        scss: '$color-theme-primary',
        css: 'var(--color-theme-primary)',
        value: '#00a3e3',
      },
      {
        scss: '$color-theme-secondary',
        css: 'var(--color-theme-secondary)',
        value: '#131416',
      },
    ],
    font: [
      {
        scss: '$color-font-primary',
        css: 'var(--color-font-primary)',
        value: '#292922',
      },
      {
        scss: '$color-font-secondary',
        css: 'var(--color-font-secondary)',
        value: '#424242',
      },
    ],
    gray: [
      {
        scss: '$color-gray-1',
        css: 'var(--color-gray-1)',
        value: '#eee',
      },
      {
        scss: '$color-gray-2',
        css: 'var(--color-gray-2)',
        value: '#ddd',
      },
    ],
    blueGray: [
      {
        scss: '$color-blue-gray-1',
        css: 'var(--color-blue-gray-1)',
        value: '#dfe2ed',
      },
      {
        scss: '$color-blue-gray-2',
        css: 'var(--color-blue-gray-2)',
        value: '#c3c6d4',
      },
      {
        scss: '$color-blue-gray-3',
        css: 'var(--color-blue-gray-3)',
        value: '#abb0c4',
      },
      {
        scss: '$color-blue-gray-4',
        css: 'var(--color-blue-gray-4)',
        value: '#8b92ab',
      },
      {
        scss: '$color-blue-gray-5',
        css: 'var(--color-blue-gray-5)',
        value: '#767f9b',
      },
      {
        scss: '$color-blue-gray-6',
        css: 'var(--color-blue-gray-6)',
        value: '#6077bf',
      },
      {
        scss: '$color-blue-gray-7',
        css: 'var(--color-blue-gray-7)',
        value: '#415797',
      },
    ],
    white: [
      {
        scss: '$color-white-1',
        css: 'var(--color-white-1)',
        value: '#fff',
      },
      {
        scss: '$color-white-2',
        css: 'var(--color-white-2)',
        value: '#fafafa',
      },
      {
        scss: '$color-white-3',
        css: 'var(--color-white-3)',
        value: '#f0f0f0',
      },
    ],
    other: [
      {
        scss: '$color-background-canvas',
        css: 'var(--color-background-canvas)',
        value: '#eff5f5',
      },
      {
        scss: '$color-focus-shadow',
        css: 'var(--color-focus-shadow)',
        value: 'rgba(20, 110, 170, 0.4)',
      },
    ],
  },
  fontSize: [
    {
      scss: '$font-size-tiny',
      css: 'var(--font-size-tiny)',
      value: '9px',
    },
    {
      scss: '$font-size-small',
      css: 'var(--font-size-small)',
      value: '11px',
    },
    {
      scss: '$font-size-default',
      css: 'var(--font-size-default)',
      value: '13px',
    },
    {
      scss: '$font-size-medium',
      css: 'var(--font-size-medium)',
      value: '16px',
    },
    {
      scss: '$font-size-large',
      css: 'var(--font-size-large)',
      value: '18px',
    },
    {
      scss: '$font-size-huge',
      css: 'var(--font-size-huge)',
      value: '24px',
    },
  ],
  fontWeight: [
    {
      scss: '$font-weight-normal',
      css: 'var(--font-weight-normal)',
      value: '400',
    },
    {
      scss: '$font-weight-bold',
      css: 'var(--font-weight-bold)',
      value: '700',
    },
  ],
  padding: [
    {
      scss: '$padding-tiny',
      css: 'var(--padding-tiny)',
      value: '4px',
    },
    {
      scss: '$padding-small',
      css: 'var(--padding-small)',
      value: '12px',
    },
    {
      scss: '$padding',
      css: 'var(--padding)',
      value: '16px',
    },
    {
      scss: '$padding-large',
      css: 'var(--padding-large)',
      value: '24px',
    },
  ],
  borderRadius: [
    {
      scss: '$border-radius-small',
      css: 'var(--border-radius-small)',
      value: '2px',
    },
    {
      scss: '$border-radius',
      css: 'var(--border-radius)',
      value: '4px',
    },
    {
      scss: '$border-radius-large',
      css: 'var(--border-radius-large)',
      value: '8px',
    },
  ],
  breakpoint: [
    {
      scss: '$tablet-lower-boundary',
      css: 'var(--tablet-lower-boundary)',
      value: '768px',
    },
    {
      scss: '$desktop-lower-boundary',
      css: 'var(--desktop-lower-boundary)',
      value: '1024px',
    },
  ],
  zIndex: [
    {
      scss: '$z-index-local',
      css: 'var(--z-index-local)',
      value: '0',
    },
    {
      scss: '$z-index-raised',
      css: 'var(--z-index-raised)',
      value: '1',
    },
    {
      scss: '$z-index-dragging',
      css: 'var(--z-index-dragging)',
      value: '2',
    },
  ],
  other: [
    {
      scss: '$focus-transition',
      css: 'var(--focus-transition)',
      value: 'box-shadow 0.1s cubic-bezier(0.4, 1, 0.75, 0.9)',
    },
  ],
};
