import { hyh_log } from '../../common/utils'
import { createComponentAction } from '../action'

export const createComponent = async (frame: addCpnFrame, cpnName: string, dest: string, type: 'page' | 'cpn') => {
  if (!['vue', 'react', 'uniapp'].includes(frame)) {
    return hyh_log.red('目前框架只支持 vue | react | uniapp')
  }
  if (frame === 'react' && type === 'page') {
    return hyh_log.red('暂无react页面模版')
  }

  await createComponentAction(frame, cpnName, dest, type)
}
