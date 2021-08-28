export const runtimeSendMessage = (type, url, params, domain) => {
  return new Promise((resolve, reject) => {
    // if (typeof window.chrome.app.isInstalled !== "undefined") {
    window.chrome.runtime.sendMessage(
      {
        type,
        url,
        params,
        domain
      },
      res => {
        res.status ? resolve(res.result) : reject(res.result)
      }
    )
    // }
  })
}

export const downloadImg = (urlName, blob) => {
  // if (urlName.indexOf('video-haodanku-com') !== -1) {
  //   const name = blob.size

  //   downloadFile(name, blob)
  //   return
  // }

  const { type } = blob
  const fileName = urlName.substring(
    urlName.lastIndexOf('/') + 1,
    urlName.indexOf('.jpg') + 4
  )

  const reg = new RegExp(/\.(gif|png|jpe?g|svg)$/i)
  const verification = reg.test(fileName)
  const name = verification
    ? fileName
    : fileName + type.replace(/image[//]/, '.')
  downloadFile(name, blob)
  // let a = document.createElement('a')
  // const url = window.URL.createObjectURL(blob)
  // // 默认隐藏
  // a.style.display = 'none'
  // a.href = url

  // a.download = name
  // // 添加到 body 标签中
  // document.body.appendChild(a)
  // a.click()
  // window.URL.revokeObjectURL(url)
  // // 下载完成移除 a 标签
  // document.body.removeChild(a)
}

export const downloadFile = (name, blob) => {
  let a = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  // 默认隐藏
  a.style.display = 'none'
  a.href = url

  a.download = name
  // 添加到 body 标签中
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  // 下载完成移除 a 标签
  document.body.removeChild(a)
}

export const downImg = (imgUrl, name) => {
  // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
  if (window.navigator.msSaveOrOpenBlob) {
    let bstr = atob(imgUrl.split(',')[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let blob = new Blob([u8arr])
    window.navigator.msSaveOrOpenBlob(blob, name + '.' + 'png')
  } else {
    // 这里就按照chrome等新版浏览器来处理
    let a = document.createElement('a')
    a.href = imgUrl
    a.setAttribute('download', name)
    a.click()
    a.remove()
  }
}
export const offSet = curEle => {
  let totalLeft = null
  let totalTop = null
  let totalRight = null
  let par = curEle.offsetParent

  //首先把自己本身的相加
  totalLeft += curEle.offsetLeft
  totalTop += curEle.offsetTop
  //现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
  while (par) {
    if (window.navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      //不是IE8我们才进行累加父级参照物的边框
      totalTop += par.clientTop
      totalLeft += par.clientLeft
    }
    //把父级参照物的偏移相加
    totalTop += par.offsetTop
    totalLeft += par.offsetLeft

    par = par.offsetParent
  }

  totalRight = document.body.clientWidth - totalLeft - curEle.offsetWidth
  return { left: totalLeft, top: totalTop, right: totalRight }
  //返回一个数组，方便我们使用哦。
}

export const validataOS = () => {
  if (window.navigator.userAgent.indexOf('Window') > 0) {
    return 'Windows'
  } else if (window.navigator.userAgent.indexOf('Mac OS X') > 0) {
    return 'Mac'
  } else if (window.navigator.userAgent.indexOf('Linux') > 0) {
    return 'Linux'
  } else {
    return 'NUll'
  }
}

export const checkBrowser = () => {
  let browserType = null

  const ua = window.navigator.userAgent.toLocaleLowerCase()

  if (ua.match(/edg/) != null) {
    browserType = 'Edg'
  } else if (ua.match(/metasr/) != null) {
    browserType = '搜狗'
  } else if (
    ua.match(/tencenttraveler/) != null ||
    ua.match(/qqbrowse/) != null
  ) {
    browserType = 'QQ'
  } else if (ua.match(/chrome/) != null) {
    const plugins = window.navigator.plugins

    const mime = (option, value) => {
      return Array.from(plugins).some(item => {
        return item[option].indexOf(value) !== -1
      })
    }

    const isgo = mime('name', 'Chrome')

    if (window['liebao']) {
      browserType = '猎豹'
    } else if (window['chrome']['adblock2345']) {
      browserType = '2345'
    } else if (!isgo && plugins['Jule game player version 3']) {
      browserType = plugins['Alipay Security Control 3'] ? '360se' : '360ee'
    } else {
      browserType = '谷歌'
    }
  } else {
    browserType = '谷歌'
  }
  return browserType
}
