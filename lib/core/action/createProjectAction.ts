import inquirer from "inquirer";
import fs from "fs";

import { createVueProjectAction } from "./createVueProjectAction";

import type { ResType } from "../type";

const mapCreateProjectAction: {[k in ResType['frame']]: typeof createVueProjectAction} = {
  vue: createVueProjectAction,
  react: () => Promise.resolve((console.log("react暂无."), false))
}

const { prompt } = inquirer;
export const createProjectAction = async (projectName: string) => {
  const res: ResType = await prompt({
    type: "rawlist",
    name: "frame",
    message: "选择一个框架",
    default: "vue",
    choices: ["vue", "react"],
  });

  const flag = await mapCreateProjectAction[res.frame](res, projectName)
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
