import chalk from 'chalk'
import { renderFile } from 'ejs'
import fs from 'fs'
import ora from 'ora'
import path from 'path'

const figlet = require('figlet')

type Fn = (...args: any) => any
const s = process.platform === 'win32' ? '\\' : '/'

export function promisify<T extends Function>(fn: T): Fn {
  return (...args: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      args.push((err: any, data: any) => {
        err ? reject(err) : resolve(data)
      })
      // @ts-ignore
      fn.apply(this, args)
    })
  }
}

const chalkLog = (color: ForegroundColor, ...args: string[]) => console.log(chalk[color](...args))

export const hyh_log = {
  red: (...args: string[]) => chalkLog('red', ...args),
  green: (...args: string[]) => chalkLog('green', ...args),
  blue: (...args: string[]) => chalkLog('black', ...args)
}

export const createDirSync = (targetPath: string) => {
  if (!fs.existsSync(targetPath)) {
    createDirSync(targetPath.split(s).slice(0, -1).join(s))
    fs.mkdirSync(targetPath)
  }
}

export const cloneDirSync = async (clonePath: string, targetPath: string, moduleName: string) => {
  const file = fs.statSync(clonePath)
  const reg = /^\[[A-z0-9]*\]/
  const smallHumpName = toHump(moduleName, 'small')
  const bigHumpName = toHump(moduleName, 'big')
  createDirSync(targetPath)

  if (file.isFile()) {
    const fileName = path.basename(clonePath)
    await cloneFile(clonePath, fileName)
    return
  }

  const dirList = fs.readdirSync(clonePath)
  for (const fileName of dirList) {
    const templatePath = path.resolve(clonePath, fileName)
    const file = fs.statSync(templatePath)
    if (file.isFile()) {
      await cloneFile(templatePath, fileName)
    } else if (file.isDirectory()) {
      const _targetPath = `${targetPath}${s}${fileName}`
      createDirSync(_targetPath)
      cloneDirSync(templatePath, _targetPath, moduleName)
    }
  }

  async function cloneFile(templatePath: string, fileName: string) {
    const res = await renderFile(templatePath, { moduleName, smallHumpName, bigHumpName })
    let _fileName = fileName.replace('.ejs', '')
    if (reg.test(_fileName)) _fileName = _fileName.replace(/\[.*\]/g, moduleName)
    write2File(`${targetPath}${s}${_fileName}`, res)
  }
}

export const write2File = (targetPath: string, content: string) => {
  if (fs.existsSync(targetPath)) hyh_log.red(`${path.basename(targetPath)} 已存在`)
  else fs.writeFileSync(targetPath, content)
}

// 转驼峰
export const toHump = (str: string, type: 'big' | 'small') => {
  let res = str.replace(/[-_]([A-z\d])/g, (_, $1) => $1.toUpperCase())
  if (type === 'big') {
    res = res[0].toUpperCase() + res.slice(1)
  }
  return res
}

// loading效果
export const fnLoadingByOra = async (fn: Fn, message: string, succeedMsg: string) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn()
  spinner.succeed(succeedMsg)
  return result
}

export const figletLog = (log: string) => {
  figlet(
    log,
    {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    },
    function (err: any, data: string) {
      if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
      }
      console.log(data)
    }
  )
}
