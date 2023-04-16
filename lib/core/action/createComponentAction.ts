import path from "path";

import { createDirSync, cloneCpnSync } from "../../common/utils";

export const createComponentAction = async (frame: addCpnFrame, cpnName: string, dest: string, type: 'page' | 'cpn') => {
  // 目录地址
  const targetPath = path.resolve(dest, cpnName);
  createDirSync(targetPath);

  const clonePath = path.resolve(__dirname, `../../templates/${frame}/${type}`)
  cloneCpnSync(clonePath, targetPath, cpnName)
  console.log(`${cpnName} 创建成功`);
};
