import { execSync } from "child_process";
import { prompt } from "inquirer";
import { commandExec } from "../../common/terminal";

import registries from "../../config/registries.json";

const getOrigin = () => execSync("npm get registry", { encoding: "utf-8" })
type originK = keyof typeof registries;
class Origin {
  getCurrentOrigin() {
    const reg = getOrigin();
    const res = Object.keys(registries).find((k) => {
      if (registries[<originK>k].registry === reg.trim()) {
        return k;
      }
    });
    if (res) {
      console.log("当前源:", res);
    } else {
      console.log("当前源:", reg);
    }
  }

  getAllOrigin() {
    const curOrigin = getOrigin();

    const keys = Object.keys(registries);

    const message: string[] = [];

    const max = Math.max(...keys.map((v) => v.length)) + 3;
    keys.forEach((k) => {
      const newK =
        registries[<originK>k].registry == curOrigin.trim() ? "* " + k : "  " + k;
      const Arr = new Array(...newK);
      Arr.length = max;
      const prefix = Array.from(Arr)
        .map((v) => (v ? v : "-"))
        .join("");
      message.push(prefix + "  " + registries[<originK>k].registry);
    });
    console.log(message.join("\n"));
  }

  async setOrigin() {
    const res: {selectOrigin: originK} = await prompt({
      type: "list",
      name: "selectOrigin",
      message: "请选择镜像",
      choices: Object.keys(registries),
    });
    const reg = registries[res.selectOrigin].registry
    const command = `npm config set registry ${reg}`
    try {
      await commandExec(command, {})
      console.log('切换成功')
    } catch (error) {
      console.log('切换失败', error);
    }
  }
}

export const { getAllOrigin, getCurrentOrigin, setOrigin } =  new Origin();
