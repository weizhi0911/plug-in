import Vue from 'vue'

import '@/main.js'
// import {
//   taoxiDocument,
//   vipshopDocument,
//   jdcomDocument
// } from '@/assets/js/content/document.js'
// import {
//   permissionWebsite,
//   permissionCoupons,
//   permissionVipShop,
//   permissionJdcom
// } from '@/assets/js/content/whiteList.js'

// import CopyParasitic from './taoxi/CopyParasitic/Index.vue'

// import { getCouponInfoX } from '@api/coupons'
// import { postStat } from '@api/common.js'

// import { sign } from '@config/sign'
// import { token } from '@config/token'

// var _hmt = _hmt || []
// var hm
// var s

// let edition

// window.chrome.runtime.sendMessage(
//   {
//     type: 'getManifest'
//   },
//   res => {
//     edition = res.version
//     InitializeRendering()
//   }
// )

// const baiduStatistics = () => {
//   // 百度统计
//   (function() {
//     hm = document.createElement('script')
//     hm.src = 'https://hm.baidu.com/hm.js?1c75a7d94a46af740af0230dc79cd7fa'
//     s = document.getElementsByTagName('script')[0]
//     s.parentNode.insertBefore(hm, s)
//   })()
// }

// const statisticalVersionPlatform = platform => {
//   // 统计各版本用户数量

//   window.chrome.runtime.sendMessage(
//     {
//       type: 'getID'
//     },
//     res => {
//       const option = {
//         type: 2,
//         platform_type: platform,
//         token: Vue.prototype.$md5(res || token())
//       }
//       postStat({ ...option, version_type: edition })
//     }
//   )
// }

// const InitializeRendering = () => {
//   const v = Number(edition.replace(/[^0-9]/gi, ''))
//   if (taoxiDocument && permissionWebsite()) {
//     const TaoxiIndex = require('./taoxi/Index.vue').default
//     // 淘系
//     baiduStatistics()

//     Vue.component('TaoxiIndex', TaoxiIndex)
//     Vue.component('CopyParasitic', CopyParasitic)

//     const instance = new Vue({
//       el: document.createElement('div'),
//       render: h => h(TaoxiIndex)
//     })

//     const CopyTemplate = new Vue({
//       el: document.createElement('div'),
//       render: h => h(CopyParasitic)
//     })

//     taoxiDocument.insertAdjacentHTML('afterend', '<div id="DUOTU"></div>')
//     document.getElementById('DUOTU').appendChild(instance.$el)
//     document.body.appendChild(CopyTemplate.$el)

//     statisticalVersionPlatform(1)
//   }
// }
alert(1)
//当前页面监视键盘输入
document.onkeydown = function(e) {
  //事件对象兼容
  let e1 = e || window.event || arguments.callee.caller.arguments[0]

  if (e1.ctrlKey && e1.keyCode === 90) {
    const plugInUnit = document.getElementById('duotu-plug-in')
    const plugBig = document.getElementById('duotu-big')

    plugInUnit && plugInUnit.remove()
    plugBig && plugBig.remove()

    !plugInUnit && InitializeRendering()
  }
}
