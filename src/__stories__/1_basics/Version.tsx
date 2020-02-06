import React from 'react';
const version = require('../../../package.json').version;

export function Version() {
  return <span>{version}</span>;
}
