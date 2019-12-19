import { text } from '@storybook/addon-knobs';
import React from 'react';
import Image from '../Image';
import docs from './README.md';

export default { title: 'Image', parameters: { info: docs } };

export const basic = () => <Image src={text('someProp', 'Hello, World!')} />;
