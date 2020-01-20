/* eslint-disable */
const pkg = require('../package.json');
const entries = Object.entries(pkg.peerDependencies);
const shell = require('shelljs');

let deps = ['yarn add'];
for ([dep, version] of entries) {
  deps[deps.length] = `${dep}@${version}`;
}

deps.push('--peer');
const cmd = deps.join(' ');
console.log('Installing peer deps!\n -----', cmd);
const result = shell.exec(cmd);

if (result.code !== 0) {
  shell.echo('Error: installing peer dependencies');
  shell.exit(1);
}
