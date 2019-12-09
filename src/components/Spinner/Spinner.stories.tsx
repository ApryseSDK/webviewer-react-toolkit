import React from 'react';
import Spinner from '../Spinner';
import docs from './README.md';

export default { title: 'Spinner', parameters: { info: docs } };

export const basic = () => <Spinner />;
