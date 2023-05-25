import { prompt } from 'inquirer'
import path from 'path'

import { cloneDirSync, createDirSync } from '../../common/utils'
import config from '../../config/repo-config.json'

export const createComponentAction = async (
  frame: addCpnFrame,
  cpnName: string,
  dest: string,
  type: 'page' | 'cpn'
) => {
  // 目录地址
  const targetPath = path.resolve(dest, cpnName)
  createDirSync(targetPath)

  const clonePath = path.resolve(__dirname, `../../templates/${frame}/${type}`)
  cloneDirSync(clonePath, targetPath, cpnName)

  if (type === 'page' && frame === 'vue') {
    const { isStore } = await prompt({
      type: 'confirm',
      name: 'isStore',
      message: `是否需要创建pinia文件?`
    })
    const { isType } = await prompt({
      type: 'confirm',
      name: 'isType',
      message: `是否需要创建type文件?`
    })
    const cloneStorePath = path.resolve(__dirname, `../../templates/vue/store/[module].ts.ejs`)
    isStore && cloneDirSync(cloneStorePath, config.storeDest, cpnName)

    const cloneTypePath = path.resolve(__dirname, `../../templates/vue/type/[module].d.ts.ejs`)
    isType && cloneDirSync(cloneTypePath, config.typeDest, cpnName)
  }
  console.log(`${cpnName} 创建成功`)
}
