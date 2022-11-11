import fs from 'fs';
const packageDev = require('./package.json');
packageDev['main'] = './lib/index.ts'
packageDev['bin'] = {
  "hyh": "./lib/index.ts"
}

fs.writeFile('./package.json', JSON.stringify(packageDev, undefined, 2), err => {
  err && console.error(err);
})