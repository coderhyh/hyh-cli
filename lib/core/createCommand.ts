import { createComponent } from './main/createComponent';
import { program } from "commander";

import { createProject } from './main/createProject';
import {
  getConfigAction,
  createComponentAction,
} from "./action";
import config from "../config/repo-config.json";

export const createCommand = () => {
  program
    .command("create <projectName>")
    .description("创建一个项目 vue | react")
    .action(createProject);

  program
    .command("addcpn <frame> <cpnName>")
    .description("添加一个组件; 如 hyh addcpn <frame> <cpnName>")
    .action((frame: addCpnFrame, cpnName: string) => {
      const { dest = config.componentDest } = program.opts<Opts>();
      createComponent(frame, cpnName, dest)
    });
    
  program
    .command("config")
    .description("获取配置文件地址; 可自行更改")
    .action(getConfigAction);
};
