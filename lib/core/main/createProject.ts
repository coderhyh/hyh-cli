import fs from 'fs'
import inquirer from 'inquirer'

import { createProjectAction } from '../action/createProjectAction'

const { prompt } = inquirer
export const createProject = async (projectName: string) => {
  const res: ResType = await prompt({
    type: 'list',
    name: 'frame',
    message: '选择一个框架',
    choices: ['vue', 'react', 'node']
  })

  const blackList = ['react']
  if (blackList.includes(res.frame)) return console.log('暂无')

  const flag = await createProjectAction(res, projectName)
  if (!flag) return

  const packagePath = `${projectName}/package.json`
  if (fs.existsSync(packagePath)) {
    let _package: any = fs.readFileSync(packagePath).toString()
    _package = JSON.parse(_package)
    _package.name = projectName
    _package.version = '1.0.0'
    fs.unlinkSync(packagePath)
    fs.writeFileSync(packagePath, JSON.stringify(_package, undefined, 2))
  }
}
