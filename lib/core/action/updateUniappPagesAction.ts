import fs from 'fs'

import { hyh_log } from '../../common/utils'
import config from '../../config/repo-config.json'

export const updateUniappPagesAction = (cpnName: string) => {
  try {
    const pagesFile = fs.readFileSync(config.uniapp['pages-json-dest'], { encoding: 'utf-8' })
    const pagesJSON = JSON.parse(pagesFile)
    const path = `pages/${cpnName}/${cpnName}`
    const isExistPath = pagesJSON.pages.some((e: any) => e.path === path)
    if (isExistPath) return
    pagesJSON.pages.push({
      path,
      style: {
        navigationBarTitleText: cpnName,
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: '#fff'
      }
    })
    fs.writeFileSync(config.uniapp['pages-json-dest'], JSON.stringify(pagesJSON, null, 2) + '\n')
  } catch (error) {
    hyh_log.red(error.message)
  }
}
