export {}
declare global {
  interface Opts {
    dest: string
  }

  interface ICreateProjectType {
    frame: 'vue' | 'react' | 'node' | 'uniapp'
  }

  type addCpnFrame = 'vue' | 'react' | 'uniapp'

  type ForegroundColor =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'gray'
    | 'grey'
    | 'blackBright'
    | 'redBright'
    | 'greenBright'
    | 'yellowBright'
    | 'blueBright'
    | 'magentaBright'
    | 'cyanBright'
    | 'whiteBright'
}
