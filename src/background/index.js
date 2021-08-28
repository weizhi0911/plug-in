import { requestByGet, requestByPost, requestByfile } from '@u/http'
import { downloadImg } from '@u/common'
import { endebug } from '@u/endebug'

const version = '1.4.0.0' // 前台页版本对比 勿删

endebug()

window.chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  let { type, url, params, domain } = req
  switch (type) {
    case 'GET':
      requestByGet(url, params, domain)
        .then(res => {
          sendResponse({ status: true, result: res['data'] })
        })
        .catch(err => {
          sendResponse({ status: false, result: err })
        })
      break
    case 'POST':
      requestByPost(url, params, domain)
        .then(res => {
          sendResponse({ status: true, result: res['data'] })
        })
        .catch(err => {
          sendResponse({ status: false, result: err })
        })
      break
    case 'File':
      requestByfile(url, {}, domain)
        .then(res => {
          if (params.type === 'copy') {
            let oFileReader = new FileReader()
            oFileReader.onloadend = function(e) {
              let base64 = e.target.result
              sendResponse({ status: true, result: base64 })
            }
            oFileReader.readAsDataURL(res['data'])
          } else {
            downloadImg(url, res['data'])
          }
        })
        .catch(err => {
          sendResponse({ status: false, result: err })
        })
      break
    case 'getVersion':
      requestByGet('/plugin/webFileV2', params, domain)
        .then(res => {
          sendResponse({ status: true, result: res.data })
        })
        .catch(err => {
          sendResponse({ status: false, result: err })
        })
      break
    case 'getBackupLink': // 应急备份js,css
      requestByGet(
        'https://xxx/plugin/webFileV2',
        params,
        ''
      )
        .then(res => {
          sendResponse({ status: true, result: res.data })
        })
        .catch(err => {
          sendResponse({ status: 'end', result: err })
        })
      break
    case 'getManifest':
      var manifest = window.chrome.runtime.getManifest()
      sendResponse(manifest)
      break
    case 'getID':
      var id = window.chrome.runtime.id
      sendResponse(id)
      break
    case 'getContentJs':
      requestByGet(url, params, 'no')
        .then(res => {
          sendResponse({ status: true, result: res.data })
        })
        .catch(err => {
          sendResponse({ status: false, result: err })
        })
      break
    case 'getCookie':
      window.chrome.cookies.getAll(
        {
          url
        },
        cookies => {
          let obj = {}
          cookies.map(c => {
            obj[c.name] = c.value
          })
          sendResponse(obj)
        }
      )
      break
    case 'version':
      sendResponse(version)
      break

    default:
      break
  }
  return true
})

/**
 * 获取当前 tab ID
 */
// function getCurrentTabId() {
//   return new Promise((resolve) => {
//     window.chrome.tabs.query({ active: true, currentWindow: true }, function(
//       tabs
//     ) {
//       console.log(tabs);
//       resolve(tabs.length ? tabs[0].id : null);
//     });
//   });
// }
let extraInfoSpec = ['blocking', 'requestHeaders']
if (window.chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS) {
  extraInfoSpec.push('extraHeaders')
}
window.chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (details.type == 'xmlhttprequest') {
      if (
        details.url.indexOf(
          'h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0?'
        ) > 0
      ) {
        let url = details.url
        let data = decodeURIComponent(url.split('=')[1])

        let itemid = '',
          isOk = false
        data.replace(/itemNumId":"(.*?)"}/g, ($, $1) => {
          itemid = $1
        })
        let ref = `https://h5.m.taobao.com/awp/core/detail.htm?id=${itemid}`
        for (let i = 0; i < details.requestHeaders.length; i++) {
          if (details.requestHeaders[i].name.toLowerCase() == 'referer') {
            details.requestHeaders[i].value = ref
            isOk = true
            break
          }
        }
        !isOk && details.requestHeaders.push({ name: 'Referer', value: ref })
      } else {
        let url = details.url

        let isOk = false
        !isOk && details.requestHeaders.push({ name: 'Referer', value: url })
      }

      // if (details.url.indexOf('c0.3.cn/stock') > 0) {
      //   let url = details.url;

      //   let isOk = false;
      //   !isOk && details.requestHeaders.push({ name: 'Referer', value: url });
      // }

      // if (details.url.indexOf('jd.com') > 0) {
      //   let url = details.url;

      //   let isOk = false;
      //   !isOk && details.requestHeaders.push({ name: 'Referer', value: url });
      // }
    }
    return { requestHeaders: details.requestHeaders }
  },
  {
    urls: [
      '*://h5api.m.taobao.com/*',
      // '<all_urls>'
      "*://union.jd.com/*",
      "*://cd.jd.com/*",
      "*://passport.jd.com/*",
      "*://c0.3.cn/stock/*",
      "*://item-soa.jd.com/*"
    ]
  },
  extraInfoSpec
)

// console.log(window.chrome.windows);
// window.chrome.windows.create(
//   { url: 'https://www.haodanku.com/', type: 'normal' },
//   res => {
//     console.log('新加页面');
//     console.log(res);
//   }
// );
// var options = {
//   url: 'https://www.haodanku.com/',
//   selected: true,
//   pinned: true,
//   index: 0
// };
// window.chrome.tabs.create(options, function (tab) {
//   console.log('tab');
//   console.log(tab)
// });

// window.chrome.windows.getAll({ populate: true }, windows => {
//   console.log('所有视窗');
//   console.log(windows);
//   let existing_tab = null;
//   let AliMaMa_LOGIN_URL = 'https://www.alimama.com/index.htm';
//   var AliMaMa_LOGIN_URL2 =
//     'https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true&disableQuickLogin=false';
//   for (var w in windows) {
//     var tabs = windows[w].tabs;
//     if (!tabs) {
//       continue;
//     }
//     var reg_alimama_url = /https\:\/\/www.alimama.com\/index.htm/i;
//     var reg_alimama_url2 = /(?:[^#]alimama)|(?:login\.taobao\.com\/member\/login.jhtml)/i;
//     for (var m = 0, n = tabs.length; m < n; m++) {
//       var tmpTab = tabs[m];
//       if (
//         tmpTab &&
//         (reg_alimama_url.test(tmpTab.url) || reg_alimama_url2.test(tmpTab.url))
//       ) {
//         existing_tab = tmpTab;
//         break;
//       }
//     }

//     if (existing_tab) {
//       // window.chrome.tabs.update(
//       //   existing_tab.id,
//       //   { url: AliMaMa_LOGIN_URL, pinned: true, selected: true },
//       //   function(tab) {
//       // nTabId = tab.id;
//       // IsLogin(nTabId);

//       // window.chrome.tabs.sendMessage(434, { 'method': 'close-loading' });
//       window.chrome.tabs.update(
//         // 加url会刷新
//         434,
//         {
//           url:
//             'https://tongji.baidu.com/web/10000361869/overview/index?siteId=16852300',
//           selected: true
//         },
//         function(tab) {
//           // setTimeout(function () {
//           //   window.chrome.tabs.sendMessage(434, { 'method': 'reflash' });
//           // }, 4000)
//         }
//       );
//     } else {
//       var options = {
//         url: AliMaMa_LOGIN_URL,
//         selected: true,
//         pinned: true,
//         index: 0
//       };
//       window.chrome.tabs.create(options, function(tab) {
//         // nTabId = tab.id;
//         // IsLogin(nTabId);
//       });
//     }
//     break;
//   }
// });

// window.chrome.windows.getCurrent(res => {
//   console.log('当前视窗');
//   console.log(res);
// });
