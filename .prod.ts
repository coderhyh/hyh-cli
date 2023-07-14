import fs from 'fs';

fs.readFile('./cli/lib/index.js', {encoding: 'utf-8'}, (err, data) => {
  if (err) return console.error(err);
  
  fs.writeFile('./cli/lib/index.js', data.replace('ts-node', 'node'), err => {
    err && console.error(err);
  })
})