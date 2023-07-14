import fs from 'fs'
import path from 'path'

import { cloneDirSync, hyh_log } from '../../common/utils'
import config from '../../config/repo-config.json'

export const createNodeModulesAction = async (moduleName: string) => {
  const nodePath = path.resolve(__dirname, `../../templates/node`)
  const nodeModulesName = fs.readdirSync(nodePath)
  const arr = nodeModulesName.map((fileName) => {
    const clonePath = path.resolve(__dirname, `../../templates/node/${fileName}`)
    const module = fileName.match(/(?<=[-.]).+(?=\.ts)/g)
    const key = `node-${module}-dest` as keyof typeof config.node
    return cloneDirSync(clonePath, <string>config.node[key], moduleName)
  })
  try {
    await Promise.all(arr)
    hyh_log.green(`${moduleName} 创建成功`)
  } catch (error) {
    hyh_log.red(error)
  }
}
