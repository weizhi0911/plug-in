ajax = function ({ url, method, body, headers }) {  //解构赋值
  return new Promise(function (resolve, reject) {  //Promise
    let request = new XMLHttpRequest()  //使用XMLHttpRequest发送请求
    request.open(method, url)  //配置request
    for (let key in headers) {  //遍历Hheaders
      let value = headers[key]
      request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
      //每当 readyState 改变时，就会触发 onreadystatechange 事件
      if (request.readyState === 4) {
        console.log('请求响应都完毕了')
        if (request.status >= 200 && request.status < 300) {
          console.log('说明请求成功')
          resolve.call(undefined, request.responseText)
        } else if (request.status >= 400) {
          console.log('说明请求失败')
          reject.call(undefined, request)
        }
      }
    }
    request.send(body)
  })
}
