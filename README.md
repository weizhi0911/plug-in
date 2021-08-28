# 谷歌插件从零开发

- 项目启动：cnpm run build-watch
- 项目打包：cnpm run build

### 项目描述
- 前台页为content.js内容，扩展页为background.js的内容
- 本项目以打包后的 content.js 前台展示为主
- 打包前前台页以打包后 content.js 为主，打包后以 init.js 请求到的文件 js,css 为主，请求回来的文件是以 content 文件里的 content.js 为入口打包的结果
- 打包后 js 文件加密混淆，文件拆分

### 必备

[谷歌插件官方文档](http://chrome.cenchy.com/history.html)
[插件开发自动更新](https://github.com/xpl/crx-hotreload)

- hot-reload.js 热加载页面，不需要手动刷新插件生效
- hot-reload.js 须在引用到的地方引用，否则不生效
  例子：

  ```
  "background": {
        "persistent": true,
        "scripts": [
            "js/hot-reload.js",
            "js/jquery.js",
            "js/background.js"
        ]
    },
  ```

[谷歌浏览器插件 content_scripts、background、popup 之间的通信](https://blog.csdn.net/guoqiankunmiss/article/details/110652076)

### content_scripts

```
  "content_scripts": [
        {
            "matches": [
                "*://*/*",
                "*://*.duotu.pro/*"
            ],
            "css": [
                "css/contents.css"
            ],
            "js": [
                "js/hot-reload.js",
                "js/jquery.js",
                "js/contents.js"
            ],
            "run_at": "document_end"
        }
    ],
```

matches 在哪个页面 url 生效的地址
插入浏览器的 js，css

### content_scripts 和 background 的通信

```
//contentJs/index.js
const but2 = $('<button id="cj_but2">向background发送消息</button>')
// 添加一个 button 按钮
page.append(but2)
$('body').append(page)
// 点击事件
$('#cj_but2').click(function (e) {
    // 点击按钮发送消息
    chrome.runtime.sendMessage({
        info: "我是 content.js， 我在发送消息"
    }, res => {
        console.log('我是 content.js ,我收到消息：', res)
    })
})
```

```
//background.js
//接收消息
chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
    console.log('我是background，我接收了来自 content.js的消息：', req.info)
    sendResponse('哈哈哈')
    const tabId = await getCurrentTabId()
    // 在背景页面发送消息，需要当前 tabID
    chrome.tabs.sendMessage(tabId, '我是background，我在发送消息', function (res) {
        console.log('background：', res)
    });
})
/**
 * 获取当前 tab ID
 */
function getCurrentTabId() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs.length ? tabs[0].id : null)
        });
    })
}
```


### 关于使用第三方接口请求不到数据

- 例如：京东接口，先看有无配置域名权限，再看接口有无添加 Referer 请求头，background.js window.chrome.webRequest.onBeforeSendHeaders 里 urls 配置可以添加请求头的域名，要先在 manifest.json 里 permissions 配置添加 webRequest，否则不生效
