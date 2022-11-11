import fs from 'fs';
const packageProd = require('./package.json');
packageProd['main'] = './bin/index.js'
packageProd['bin'] = {
  "hyh": "./bin/index.js"
}

fs.writeFile('./package.json', JSON.stringify(packageProd, undefined, 2), err => {
  if (err) return console.error(err);
})

fs.readFile('./bin/index.js', {encoding: 'utf-8'}, (err, data) => {
  if (err) return console.error(err);
  
  fs.writeFile('./bin/index.js', data.replace('ts-node', 'node'), err => {
    err && console.error(err);
  })
})