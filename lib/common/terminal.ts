// const { spawn } = require('child_process');
import { exec } from 'child_process'

// npm install
export const commandExec = (...args: Parameters<typeof exec>) => {
  return new Promise<void>((resolve, reject) => {
    const childProcess = exec(...args)
    childProcess.stdout?.pipe(process.stdout)
    childProcess.stderr?.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}
