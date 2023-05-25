export {}
declare global {
  interface Opts {
    dest: string
  }

  interface ResType {
    frame: 'vue' | 'react' | 'node'
  }

  type addCpnFrame = 'vue' | 'react'
}
