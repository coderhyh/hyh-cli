import { program } from 'commander'

import config from '../config/repo-config.json'
import { getConfigAction } from './action'
import { createNodeModulesAction } from './action'
import { createComponent } from './main/createComponent'
import { createProject } from './main/createProject'
import { setOrigin } from './main/setOrigin'

export const createCommand = () => {
  program.command('create <projectName>').description('创建一个项目').action(createProject)

  program
    .command('addpage <frame> <pageName>')
    .description('添加一个页面; 如: hyh addpage <frame> <pageName>')
    .action((frame: addCpnFrame, pageName: string) => {
      const { dest = config[frame]['page-dest'] } = program.opts<Opts>()
      createComponent(frame, pageName, dest, 'page')
    })

  program
    .command('addcpn <frame> <cpnName>')
    .description('添加一个组件; 如: hyh addcpn <frame> <cpnName>')
    .action((frame: addCpnFrame, cpnName: string) => {
      const { dest = config[frame]['component-dest'] } = program.opts<Opts>()
      createComponent(frame, cpnName, dest, 'cpn')
    })

  program
    .command('addmodule <moduleName>')
    .description('添加一个node模块; 如: hyh addmodule <moduleName>')
    .action((moduleName: string) => {
      createNodeModulesAction(moduleName)
    })

  program.command('origin').description('设置npm镜像源').action(setOrigin)

  program.command('config').description('获取配置文件地址; 可自行更改').action(getConfigAction)
}
