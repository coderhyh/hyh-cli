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
    const res = await renderFile(clonePath, { moduleName, smallHumpName, bigHumpName })
    const fileName = path.basename(clonePath)
    const _fileName = reg.test(fileName)
      ? fileName.replace('.ejs', '').replace(/\[.*\]/g, moduleName)
      : fileName.replace('.ejs', '')
    write2File(`${targetPath}${s}${_fileName}`, res)
    return
  }

  const dirList = fs.readdirSync(clonePath)
  for (const fileName of dirList) {
    const templatePath = path.resolve(clonePath, fileName)
    const file = fs.statSync(templatePath)
    if (file.isFile()) {
      const res = await renderFile(templatePath, { moduleName, smallHumpName, bigHumpName })
      const _fileName = reg.test(fileName)
        ? fileName.replace('.ejs', '').replace(/\[.*\]/g, moduleName)
        : fileName.replace('.ejs', '')
      write2File(`${targetPath}${s}${_fileName}`, res)
    } else if (file.isDirectory()) {
      const _targetPath = `${targetPath}${s}${fileName}`
      createDirSync(_targetPath)
      cloneDirSync(templatePath, _targetPath, moduleName)
    }
  }
}

export const write2File = (targetPath: string, content: string) => {
  if (fs.existsSync(targetPath)) console.error(`${targetPath} 已存在`)
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
