import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure} from '@storybook/react';

addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.tsx/), module);
