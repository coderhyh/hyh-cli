import { program } from "commander";

import {
  createProjectAction,
  getConfigAction,
  addComponentAction,
} from "./action";
import config from "../config/repo-config.json";

import type { Opts } from "./type";
export const createCommand = () => {
  program
    .command("create <projectName>")
    .description("创建一个项目 vue | react")
    .action(createProjectAction);

  program
    .command("addcpn <cpnName>")
    .description("添加一个组件; 如 hyh addcpn <cpnName>; 默认配置可 hyh config 进行修改")
    .action((cpnName: string) => {
      const { dest = config.componentDest } = program.opts<Opts>();
      addComponentAction(cpnName, dest)
    });
    
  program
    .command("addpage <cpnName>")
    .description("添加一个页面; 如 hyh addpage <pageName>; 默认配置可 hyh config 进行修改")
    .action((pageName: string) => {
      const { dest = config.pageDest } = program.opts<Opts>();
      addComponentAction(pageName, dest)
    });

  program
    .command("config")
    .description("获取配置文件地址; 可自行更改")
    .action(getConfigAction);
};
