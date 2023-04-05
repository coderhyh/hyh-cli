import fs from 'fs';

fs.readFile('./cli/bin/index.js', {encoding: 'utf-8'}, (err, data) => {
  if (err) return console.error(err);
  
  fs.writeFile('./cli/bin/index.js', data.replace('ts-node', 'node'), err => {
    err && console.error(err);
  })
})