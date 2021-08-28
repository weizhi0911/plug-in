// 注册全局公用组件，适用于 Vue

import Vue from 'vue'

const filesContainer = [
  // require.context(
  //   // 其组件目录的相对路径
  //   '../components/business/global',
  //   // 是否查询其子目录
  //   true,
  //   // 匹配基础组件文件名的正则表达式
  //   /.vue$/
  // ),
  require.context(
    // 其组件目录的相对路径
    '../components/global',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /.vue$/
  )
]

const register = (filesContainer) => {
  filesContainer.forEach((files) => {
    files.keys().forEach((fileName) => {
      const file = files(fileName)
      const fileModule = file.default || file
      const componentName = fileName
        .replace(/\.\/([^.]+).*$/, '$1')
        .replace(/\/(Index)?/, '')

      Vue.component(componentName, fileModule)
    })
  })
}

register(filesContainer)
