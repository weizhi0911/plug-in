import { jdId } from '@config/url.js'
import { getInfo } from '@u/lib'
export default {
  data() {
    return {
      jdId,
      // isLoginjd: true,
      jdlmLogin: 'https://union.jd.com/index',
      jdLogin:
        'https://passport.jd.com/new/login.aspx?ReturnUrl=' +
        window.location.href
    }
  },
  computed: {
    getId() {
      return {
        product_id: this.jdId
      }
    },
    getShopId() {
      const test = document.getElementsByTagName('html')[0].innerHTML
      return getInfo(test, "shopId:'", "',")
    },
    getCat() {
      const test = document.getElementsByTagName('html')[0].innerHTML

      return getInfo(test, 'cat: [[]', '],')
    },
    getCatName() {
      const test = document.getElementsByTagName('html')[0].innerHTML

      return getInfo(test, 'catName: [[]', '],')
    },
    heardData() {
      return this.getCatName
        .replace(/"/g, '')
        .toString()
        .split(',')
    },
    shopName() { // 商品店名
      return (
        document.querySelector(
          '#crumb-wrap > div > div.contact.fr.clearfix > div.J-hove-wrap.EDropdown.fr > div:nth-child(1) > div > a'
        ) ||
        document.querySelector(
          '#root-nav > div.flow-intro.clearfix > div.fi-merchant > div > div.fi-me-adress > div > a.ad-cp-name'
        )
      ).innerText
    },
    selfSupport() { // 是否不为自营店
      return (
        document.querySelector('#crumb-wrap') &&
        document.querySelector('#crumb-wrap').innerText.indexOf('自营') === -1
      )
    }
  }
}
