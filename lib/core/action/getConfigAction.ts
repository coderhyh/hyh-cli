import path from 'path'

import { hyh_log } from '../../common/utils'

export const getConfigAction = () => {
  const _path = path.resolve(__dirname, '../../config/repo-config.json')
  hyh_log.green(_path)
}
