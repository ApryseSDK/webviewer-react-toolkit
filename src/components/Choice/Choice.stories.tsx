import { boolean, text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Choice } from '../Choice';
import readme from './README.md';

export default { title: 'Components/Choice', component: Choice, parameters: { readme } };

export const Basic = () => (
  <Choice
    onChange={action('onChange')}
    label={text('label', 'Choice')}
    radio={boolean('radio', false)}
    disabled={boolean('disabled', false)}
  />
);

export const Controlled = () => (
  <Choice
    onChange={action('onChange')}
    label={text('label', 'Choice')}
    radio={boolean('radio', false)}
    disabled={boolean('disabled', false)}
    checked={boolean('checked', false)}
  />
);

export const NativeFormControlled = () => {
  const props = {
    radio: boolean('radio', true),
    disabled: boolean('disabled', false),
  };

  return (
    <form className="ui__base">
      <p>One from each group can be selected (native form behavior)</p>
      <h3>Pet</h3>
      <Choice {...props} label="Dog" value="dog" name="pet" />
      <Choice {...props} label="Cat" value="cat" name="pet" />
      <Choice {...props} label="Rat" value="rat" name="pet" />

      <h3>Color</h3>
      <Choice {...props} label="Red" value="red" name="color" />
      <Choice {...props} label="Blue" value="blue" name="color" />
      <Choice {...props} label="Green" value="green" name="color" />
    </form>
  );
};

export const CustomControlled = () => {
  const [selected, setSelected] = useState(0);

  const props = {
    radio: boolean('radio', true),
    disabled: boolean('disabled', false),
  };

  return (
    <>
      <p>React state allows for only one to be selected (custom)</p>
      <h3>Pet</h3>
      <Choice {...props} label="Dog" onChange={() => setSelected(0)} checked={selected === 0} />
      <Choice {...props} label="Cat" onChange={() => setSelected(1)} checked={selected === 1} />
      <Choice {...props} label="Rat" onChange={() => setSelected(2)} checked={selected === 2} />

      <h3>Color</h3>
      <Choice {...props} label="Red" onChange={() => setSelected(3)} checked={selected === 3} />
      <Choice {...props} label="Blue" onChange={() => setSelected(4)} checked={selected === 4} />
      <Choice {...props} label="Green" onChange={() => setSelected(5)} checked={selected === 5} />
    </>
  );
};
