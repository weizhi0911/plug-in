//background.js
//此js信息需要在背景页看的到（背景页在浏览器扩展程序页面，谷歌：chrome://extensions/）
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