import { boolean, number, select } from '@storybook/addon-knobs';
import React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup';
import readme from './README.md';

export default { title: 'Components/ButtonGroup', component: ButtonGroup, parameters: { readme } };

export const Basic = () => {
  const numButtons = number('numButtons', 2, { min: 1, max: 5, range: true, step: 1 });

  return (
    <ButtonGroup
      position={select('position', ['left', 'center', 'right', 'space-between', 'space-around'], 'right')}
      reverseWrap={boolean('reverseWrap', false)}
      centerMobile={boolean('centerMobile', false)}
    >
      {Array.from({ length: numButtons }).map((_, index) => {
        if (index === 0) {
          return <Button key={index}>Accept</Button>;
        }
        if (index === 1) {
          return (
            <Button key={index} buttonStyle="outline">
              Cancel
            </Button>
          );
        }
        return (
          <Button
            key={index}
            buttonStyle={['default', 'outline', 'borderless'][index % 3] as ButtonProps['buttonStyle']}
          >
            Button {index + 1}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export const Nested = () => {
  return (
    <ButtonGroup position="space-between" centerMobile>
      <Button>Other</Button>

      <ButtonGroup position="right" centerMobile>
        <Button>Accept</Button>
        <Button buttonStyle="outline">Cancel</Button>
      </ButtonGroup>
    </ButtonGroup>
  );
};

export const WithLargeButtons = () => {
  return (
    <ButtonGroup
      position={select('position', ['left', 'center', 'right', 'space-between', 'space-around'], 'right')}
      reverseWrap={boolean('reverseWrap', false)}
      centerMobile={boolean('centerMobile', false)}
    >
      <Button>Accept But With Long Name So You Can See It Wrap</Button>
      <Button buttonStyle="outline">Cancel But With Long Name So You Can See It Wrap</Button>
    </ButtonGroup>
  );
};
