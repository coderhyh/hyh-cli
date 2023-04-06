import { prompt } from "inquirer";

import * as origin from '../action'

interface IOriginType {
  instruct: 'getCurrentOrigin' | 'getAllOrigin' | 'setOrigin'
}

export const setOrigin = async () => {
  const res: IOriginType = await prompt({
    type: "list",
    name: "instruct",
    message: "请选择",
    choices: [
      {name: '查看当前源', value: 'getCurrentOrigin'},
      {name: '查看所有源', value: 'getAllOrigin'},
      {name: '修改源', value: 'setOrigin'},
    ],
  });
  
  origin[res.instruct]()
}