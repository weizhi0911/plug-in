# 谷歌插件从零开发

### 必备

[谷歌插件官方文档](http://chrome.cenchy.com/history.html)
[插件开发自动更新](https://github.com/xpl/crx-hotreload)

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
