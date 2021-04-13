console.log(2222)


//创建页面函数
function createPage() {
   console.log('来饿了')
   const a = $('.commodity-data')
   const page = $('<div id="cj_move_page"></div>')
   const h3 = $('<h3 id="cj_move_h3">my Plugin</h3>')
   page.append(h3)
   a.append(page)
   // $('.main-img-wrap').onClick()
   //拖拽
   // drag(a)
}
const clear = setInterval(() => {
   const a = $('.commodity-data').length
   if (a) {
      createPage()
      clearInterval(clear)
   }
}, 200);

//拖拽
function drag(ele) {
   let oldX, oldY, newX, newY
   ele.onmousedown = function (e) {
      if (!cj_move_page.style.right && !cj_move_page.style.bottom) {
         cj_move_page.style.right = 0
         cj_move_page.style.bottom = 0
      }
      oldX = e.clientX
      oldY = e.clientY
      document.onmousemove = function (e) {
         newX = e.clientX
         newY = e.clientY
         cj_move_page.style.right = parseInt(cj_move_page.style.right) - newX + oldX + 'px'
         cj_move_page.style.bottom = parseInt(cj_move_page.style.bottom) - newY + oldY + 'px'
         oldX = newX
         oldY = newY
      }
      document.onmouseup = function () {
         document.onmousemove = null
         document.onmouseup = null
      }
   }
}

//contentJs/index.js
const but2 = $('<button id="cj_but2">向background发送消息</button>')
// 添加一个 button 按钮
$('#app').append(but2)
// 点击事件
$('#cj_but2').click(function (e) {
    // 点击按钮发送消息
    chrome.runtime.sendMessage({
        info: "我是 content.js， 我在发送消息"
    }, res => {
        console.log('我是 content.js ,我收到消息：', res)
    })
})
// 接收消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse)
    sendResponse('我收到了你的消息！');
});
