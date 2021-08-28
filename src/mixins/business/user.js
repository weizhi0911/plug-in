import { urlId } from '@config/url.js'
import { getInfo } from '@u/lib'
export default {
  data() {
    return {
      urlId
    }
  },
  computed: {
    getId() {
      return {
        product_id: this.urlId
      }
    },
    getVideoId() {
      const test = document.getElementsByTagName('html')[0].innerHTML
      return getInfo(test, '"imgVedioID":"', '","')
    },
    getSellerId() {
      const test = document.getElementsByTagName('html')[0].innerHTML
      return getInfo(test, 'sellerId=', '&')
    },
    getShopId() {
      const test = document.getElementsByTagName('html')[0].innerHTML

      const shopNode = document.getElementById('LineZing')
      const shopId = shopNode && shopNode.getAttribute('shopid')

      return (
        shopId ||
        getInfo(test, 'atp_isdpp=2v', '&') ||
        getInfo(test, 'shopId=', ';')
      )
    },
    getEncryptSellerId() {
      const test = document.getElementsByTagName('html')[0].innerHTML
      let value
      test.replace(/encryptSellerId":""*?(.*?)",/g, ($, $1) => {
        value = $1
      })
      return value
    },
    shopName() {
      // 商品店名
      return (
        document.querySelector('#shopExtra > div.slogo > a > strong') ||
        document.querySelector(
          '#J_ShopInfo > div > div.tb-shop-info-hd > div.tb-shop-name > dl > dd > strong > a'
        )
      ).innerText
    },
    logintb() {
      return (
        'https://login.taobao.com/member/login.jhtml?redirectURL=' +
        encodeURIComponent(location.href)
      )
    },
    loginali() {
      return 'https://pub.alimama.com'
    }
  }
}
