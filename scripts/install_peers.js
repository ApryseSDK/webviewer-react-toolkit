/* eslint-disable */
const pkg = require('../package.json');
const entries = Object.entries(pkg.peerDependencies);
const shell = require('shelljs');

let deps = ['yarn add -P'];
for ([dep, version] of entries) {
  deps[deps.length] = `${dep}@${version}`;
}

deps.push('--ignore-scripts'); // Prevent infinite loop.
const cmd = deps.join(' ');
console.log('\nInstalling Peer Dependencies\n----------------------------');
console.log(`\n$ ${cmd}\n\n`);
const result = shell.exec(cmd);

if (result.code !== 0) {
  shell.echo('Error: Unable to install peer dependencies');
  shell.exit(1);
}
