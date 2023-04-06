import { createComponentAction } from "../action";

export const createComponent = async (frame: addCpnFrame, cpnName: string, dest: string) => {
  if (!['vue', 'react'].includes(frame)) {
    return console.log('目前只支持 vue | react');
  }

  await createComponentAction(frame, cpnName, dest)
}