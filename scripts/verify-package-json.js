const path = require('path');
const fs = require('fs');

/**
 * This script makes sure that the symlink between this repo and
 * any local repos are destroyed before commiting
 */
(async () => {

  throw new Error('test');
  const jsonPath = path.resolve(__dirname, '../package.json');
  const json = JSON.parse(fs.readFileSync(jsonPath) + '');
  json.main = "./dist/cjs/index.js";
  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
})()