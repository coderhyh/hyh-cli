import ora from 'ora'
import fs from 'fs';
import path from 'path';
import { renderFile } from "ejs";

type Fn = (...args: any) => any;
const s = process.platform === 'win32' ? '\\' : '/'

export function promisify<T extends Function>(fn: T): Fn {
  return (...args: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      args.push((err: any, data: any) => {
        err ? reject(err) : resolve(data);
      });
      // @ts-ignore
      fn.apply(this, args);
    });
  };
}

export const createDirSync = (targetPath: string) => {
  if (!fs.existsSync(targetPath)) {
    createDirSync(targetPath.split(s).slice(0, -1).join(s))
    fs.mkdirSync(targetPath)
  }
}

export const cloneCpnSync = async (clonePath: string, targetPath: string, cpnName: string) => {
  const dirList = fs.readdirSync(clonePath)
  for (const fileName of dirList) {
    const templatePath = path.resolve(clonePath, fileName)
    let file = fs.statSync(templatePath);
    if(file.isFile()){
      const toHumpName = toHump(cpnName)
      const res = await renderFile(templatePath, { cpnName, toHumpName });
      const reg = /^\[[A-z0-9]*\]/
      const _fileName = reg.test(fileName)
        ? `${cpnName}.${fileName.split('.')[1]}`
        : fileName.replace('.ejs', '');
      write2File(`${targetPath}${s}${_fileName}`, res)
    }else if(file.isDirectory()){
      const _targetPath = `${targetPath}${s}${fileName}`
      createDirSync(_targetPath)
      cloneCpnSync(templatePath, _targetPath, cpnName)
    }
  }
}

export const write2File = (targetPath: string, content: string) => {
  if (fs.existsSync(targetPath)) console.error(`${targetPath} 已存在`);
  else fs.writeFileSync(targetPath, content)
}

// 转驼峰
export const toHump = (str: string) => {
  return str.split('-').map((e, i) => i ? (e[0].toUpperCase() + e.slice(1)) : (e)).join('')
}

// loading效果
export const fnLoadingByOra = async (fn: Fn, message: string, succeedMsg: string) => {
  const spinner = ora(message);
  spinner.start();
  let result = await fn();
  spinner.succeed(succeedMsg);
  return result;
};
