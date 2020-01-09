import { Description, DocsContainer } from '@storybook/addon-docs/dist/blocks';
import React from 'react';

export default (...props) => {
  console.log(props);
  return (
    <DocsContainer>
      {/* <Title /> */}
      <Description />
    </DocsContainer>
  );
};
