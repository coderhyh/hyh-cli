import inquirer from "inquirer";
import fs from "fs";

import { createProjectAction } from "../action/createProjectAction";

import type { ResType } from "../type";

const { prompt } = inquirer;
export const createProject = async (projectName: string) => {
  const res: ResType = await prompt({
    type: "rawlist",
    name: "frame",
    message: "选择一个框架",
    default: "vue",
    choices: ["vue", "react", "node"],
  });

  const blackList = ["react", "node"]
  if (blackList.includes(res.frame)) return console.log('暂无');

  const flag = await createProjectAction(res, projectName)
  if (!flag) return

  const packagePath = `${projectName}/package.json`;
  if (fs.existsSync(packagePath)) {
    let _package: any = fs.readFileSync(packagePath).toString();
    _package = JSON.parse(_package);
    _package.name = projectName;
    _package.version = "1.0.0";
    fs.unlinkSync(packagePath);
    fs.writeFileSync(packagePath, JSON.stringify(_package, undefined, 2));
  }
};