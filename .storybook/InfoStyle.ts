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
    padding: '32px',
    borderRadius: 0,
    margin: '32px -32px -32px',
    borderTop: '1px solid #dfe2ed',
    height: '100%',
  },
  propTableHead: {
    ...base.source.propTableHead,
    margin: '28px 0 0 0',
    padding: '0 0 8px 0',
    fontSize: '18px',
  },
});
