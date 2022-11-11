import fs from "fs";
import path from "path";
import { renderFile } from "ejs";

import { createDirSync, cloneCpnSync } from "../../common/utils";

export const addComponentAction = async (cpnName: string, dest: string) => {
  // 目录地址
  const targetPath = path.resolve(dest, cpnName);
  createDirSync(targetPath);

  const clonePath = path.resolve(__dirname, '../../templates/vue/cpn')
  cloneCpnSync(clonePath, targetPath, cpnName)
  console.log(`${cpnName} 创建成功～`);
};
