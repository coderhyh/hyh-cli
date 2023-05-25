const figlet = require('figlet')

figlet(
  'hyh-cli',
  {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  },
  function (err, data) {
    if (err) {
      console.log('Something went wrong...')
      console.dir(err)
      return
    }
    console.log(data)
    console.log('安装之后使用hyh命令')
  }
)
