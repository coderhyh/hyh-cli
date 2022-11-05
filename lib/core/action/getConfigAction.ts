import path from 'path';

export const getConfigAction = () => {
  const _path = path.resolve(__dirname, '../../config/repo-config.json')
  console.log(_path);
}