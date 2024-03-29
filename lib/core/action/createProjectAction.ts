import fs from 'fs'
import inquirer from 'inquirer'
import { promisify } from 'util'

import { commandExec } from '../../common/terminal'
import { figletLog, fnLoadingByOra } from '../../common/utils'
import { origin } from '../../config/repo-config.json'
const download = promisify(require('download-git-repo'))

const { prompt } = inquirer

export const createProjectAction = async (res: ICreateProjectType, projectName: string) => {
  if (fs.existsSync(projectName)) {
    const res = await prompt({
      type: 'confirm',
      name: 'isCover',
      message: `${projectName} 目录已存在, 是否覆盖？`
    })
    const rmDir = process.platform === 'win32' ? 'rd /s /q' : 'rm -rf'
    if (res.isCover) await commandExec(`${rmDir} ${projectName}`, {})
    else return false
  }

  await fnLoadingByOra(() => download(origin[res.frame], projectName, { clone: true }), '正在拉取项目...', '下载成功')
  figletLog('success!')

  return true
}
