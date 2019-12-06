// https://github.com/storybookjs/storybook/blob/master/addons/info/src/components/Story.js#L19
export const InfoStyle = (base: any) => ({
  ...base,
  button: {
    ...base.button,
    base: {
      ...base.button.base,
      opacity: 0.6,
      zIndex: 2,
    },
    topRight: {
      bottom: 0,
      right: 0,
      borderRadius: '5px 0 0 0',
    },
  },
  info: {
    ...base.info,
    padding: 0,
  },
  infoBody: {
    ...base.infoBody,
    fontSize: '14px',
    fontWeight: 400,
    border: 'none',
    padding: '0 16px 24px',
    borderRadius: 0,
    margin: 0,
  },
  propTableHead: {
    ...base.source.propTableHead,
    margin: '28px 0 0 0',
    padding: '0 0 8px 0',
    fontSize: '18px',
  },
});
