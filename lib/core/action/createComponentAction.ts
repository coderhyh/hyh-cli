import { prompt } from 'inquirer'
import path from 'path'

import { cloneDirSync, createDirSync, hyh_log } from '../../common/utils'
import config from '../../config/repo-config.json'
import { updateUniappPagesAction } from './updateUniappPagesAction'

export const createComponentAction = async (
  frame: addCpnFrame,
  cpnName: string,
  dest: string,
  type: 'page' | 'cpn'
) => {
  try {
    // 目录地址
    const targetPath = path.resolve(dest, cpnName)
    createDirSync(targetPath)

    const clonePath = path.resolve(__dirname, `../../templates/${frame}/${type}`)
    await cloneDirSync(clonePath, targetPath, cpnName)

    if (type === 'page' && ['vue', 'uniapp'].includes(frame)) {
      frame === 'uniapp' && updateUniappPagesAction(cpnName)

      type T = 'vue' | 'uniapp'
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
      const cloneStorePath = path.resolve(__dirname, `../../templates/${frame}/store/[module].ts.ejs`)
      isStore && cloneDirSync(cloneStorePath, config[<T>frame]['store-dest'], cpnName)

      const cloneTypePath = path.resolve(__dirname, `../../templates/${frame}/type/[module].d.ts.ejs`)
      isType && cloneDirSync(cloneTypePath, config[<T>frame]['type-dest'], cpnName)
    }
    setTimeout(() => {
      hyh_log.green(`${cpnName} 创建成功`)
    })
  } catch (error) {
    hyh_log.red(error)
  }
}
