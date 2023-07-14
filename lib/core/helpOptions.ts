import { program } from 'commander'

export const helpOptions = () => {
  const version = require('../../package.json').version
  program.version(version, '-v, --version', '查看版本')
  program.option('-d, --dest <dest>', '自定义目录, 例如: hyh addcpn <cpnName> -d <src/component>')
}
