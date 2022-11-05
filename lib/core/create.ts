import { program } from "commander";

import { createProjectAction, getConfigAction } from "./action";

export const createCommand = () => {
  program
    .command("create <projectName>")
    .description("创建一个项目 vue | react")
    .action(createProjectAction);

  program
    .command("config")
    .description("获取配置文件地址; 可自行更改")
    .action(getConfigAction);
};
