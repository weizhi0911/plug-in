import { getSellerCaptcha, getSellerContact } from '@api/business'
import { getInfo } from '@u/lib'
import { sign } from '@config/sign'

/*
 * author: ovsexia
 * version: 1.2.0
 * name: Jsajax
 * describe: 原生ajax封装
 * License: Mozilla Public License Version 2.0
 */

export const Captcha = function(config) {
  //默认参数
  const defaluts = {
    el: '',
    clicks: 3,
    url: null,
    tip: '请依次点击图中的',
    callback: null,
    isOk: false, // 滑入开关
    mousetrack: [], // 鼠标轨迹
    type: '' // 1为淘宝，2为京东
  }

  const stopPropagation = e => {
    if (e && e.stopPropagation) {
      //非IE
      e.stopPropagation()
    } else {
      //IE
      window.event.cancelBubble = true
    }
  }

  const test = document.getElementsByTagName('html')[0].innerHTML
  const getSellerId = getInfo(test, 'sellerId=', '&')
  const getShopId = getInfo(test, "shopId:'", "',")
  let keys = ''

  let captcha = new Object()
  captcha = (function(captcha) {
    captcha.config = {}
    if (!config.el) {
      return false
    }
    let firpre = config.el.substr(0, 1)
    if (firpre === '#') {
      config.el = config.el.substr(1)
    }
    captcha.config.el = config.el
    captcha.form = document.getElementById(config.el) || null

    if (!captcha.form) {
      console.log('%c%s', 'color:red', 'Error: 元素不存在')
      return false
    }
    let input = document.createElement('input')
    input.name = 'captcha'
    input.type = 'hidden'
    captcha.input = document.getElementById(config.el).appendChild(input)
    captcha.button =
      captcha.form.getElementsByClassName('captcha_submit')[0] || null
    if (!captcha.button) {
      console.log(
        '%c%s',
        'color:red',
        'Error: 提交按钮未添加 className: "captcha_submit"'
      )
      return false
    }

    captcha.config.clicks = config.clicks ? config.clicks : defaluts.clicks
    captcha.config.url = config.url ? config.url : defaluts.url
    captcha.config.mousetrack = config.mousetrack
      ? config.mousetrack
      : defaluts.mousetrack
    captcha.config.isOk = config.isOk ? config.isOk : defaluts.isOk

    captcha.config.tip = config.tip ? config.tip : defaluts.tip
    captcha.config.type = config.type ? config.type : defaluts.type
    captcha.config.callback = config.callback
      ? config.callback
      : defaluts.callback
    captcha.cindex = 0
    captcha.poi = []
    captcha.config.poisize = 24

    captcha.button.addEventListener('mouseenter', function() {
      captcha.config.isOk = true
    })

    captcha.button.addEventListener('mouseleave', function() {
      captcha.config.isOk = false
    })

    captcha.button.addEventListener('click', function() {
      if (!captcha.config.mousetrack.length || !captcha.config.isOk) {
        // 没有鼠标轨迹或没有滑入按钮
        console.error('Error: 非法请求')
        return
      }
      captcha.show()
    })
    return captcha
  })(captcha)

  //显示验证码
  captcha.show = function() {
    let that = this
    let chtml = document.createElement('div') //xcaptcha xon
    chtml.className = 'xcaptcha xon'
    chtml.innerHTML =
      '<div class="xcaptcha_bg"></div>\
      <div class="xcaptcha_in">\
        <div class="xcaptcha_box">\
          <div class="xcaptcha_imgbox"><img class="xcaptcha_img" /><div class="xcaptcha_cover"></div></div>\
          <div class="xcaptcha_p">\
            <p>' +
      that.config.tip +
      ': <span class="xcaptcha_span">...</span></p>\
      <svg\
      class="icon iconclose g-cursor-pointer"\
      aria-hidden="true"\
    >\
      <use xlink:href="#icon-x2"></use>\
    </svg>\
            <span class="xcaptcha_rebtn"><i class="icaptcha-refresh"></i></span>\
          </div>\
        </div>\
      </div>'
    document.body.appendChild(chtml)
    // document.getElementById("duotu-plug-in").appendChild(chtml);

    that.maindiv = chtml

    that.img = that.maindiv.getElementsByClassName('xcaptcha_img')[0]

    //绑定关闭验证码
    that.bg = that.maindiv.getElementsByClassName('xcaptcha_bg')[0]
    that.bg.addEventListener('click', function(e) {
      stopPropagation(e)
      that.close()
    })

    //绑定刷新验证码
    that.rebtn = that.maindiv.getElementsByClassName('xcaptcha_rebtn')[0]
    that.rebtn.addEventListener('click', function() {
      that.refresh()
    })

    //关闭
    that.clobtn = that.maindiv.getElementsByClassName('iconclose')[0]
    that.clobtn.addEventListener('click', function(e) {
      stopPropagation(e)
      that.close()
    })

    //绑定点选
    that.imgbox = that.maindiv.getElementsByClassName('xcaptcha_imgbox')[0]
    that.imgbox.addEventListener('click', function(e) {
      stopPropagation(e)
      that.csubmit(e)
    })

    that.span = that.maindiv.getElementsByClassName('xcaptcha_span')[0]

    that.refresh()
  }

  //开始点选
  captcha.csubmit = async function(e) {
    let that = this

    if (that.imgbox.getElementsByClassName('xcaptcha_alert')[0]) {
      return false
    }

    let x = e.offsetX - that.config.poisize / 2
    let y = e.offsetY - that.config.poisize / 2
    let poi = e.offsetX + '-' + e.offsetY //提交中心点坐标
    that.poi.push(poi)
    that.cindex++

    let phtml = document.createElement('div')
    phtml.innerHTML = '<p>' + that.cindex + '</p>'
    phtml.className = 'xcaptcha_poi'
    phtml.style.width = that.poisize + 'px'
    phtml.style.height = that.poisize + 'px'
    phtml.style.top = y + 'px'
    phtml.style.left = x + 'px'
    that.imgbox.appendChild(phtml)

    if (that.cindex === that.config.clicks) {
      let ivalue = that.config.poisize + '||' + that.poi.join(',')
      that.load()

      const option = {
        seller_id: getSellerId || getShopId,
        val: ivalue,
        key: keys,
        type: that.config.type
      }
      const data = await getSellerContact({ ...option, sign: sign(option) })
      that.loadClose()
      if (data.code !== 0) {
        that.refresh()
      } else {
        that.close()
      }
      if (that.config.callback && typeof that.config.callback == 'function') {
        that.config.callback(data)
      }
      //  else {
      //   this.$message("验证失败");
      // }

      // let myajax = new Ajax({
      //   type: "post",
      //   url: that.config.url,
      //   data: { act: "check", ivalue: ivalue },
      //   dataType: "json",
      //   success: function(data) {
      //     if (data.check) {
      //       that.input.value = ivalue;
      //       if (
      //         that.config.callback &&
      //         typeof that.config.callback == "function"
      //       ) {
      //         that.config.callback();
      //       }
      //       if (document.getElementById(that.config.el).onsubmit) {
      //         let onsubmit = document
      //           .getElementById(that.config.el)
      //           .onsubmit(this);
      //         if (onsubmit === false) {
      //           that.close();
      //           return false;
      //         }
      //       }
      //       document.getElementById(that.config.el).submit();
      //       that.close();
      //     } else {
      //       that.loadClose();
      //       that.error("Captcha is wrong", function() {
      //         that.refresh();
      //       });
      //     }
      //   },
      // });
      // myajax.send();
    }
  }

  //反馈
  captcha.alert = function(type, msg, call) {
    let that = this
    let alert = document.createElement('div')
    alert.className = 'xcaptcha_alert'
    let alert_html = '<div class="xcaptcha_alertin">'
    if (type == 'error') {
      alert_html +=
        '<p class="xcaptcha_error"><i class="icaptcha-error"></i> ' +
        msg +
        '</p>'
    } else if (type == 'load') {
      alert_html +=
        '<p class="xcaptcha_load"><span></span><span></span><span></span></p>'
    }
    alert_html += '</div>'
    alert.innerHTML = alert_html
    that.imgbox.appendChild(alert)
    if (that.imgbox.getElementsByClassName('xcaptcha_error').length > 0) {
      that.imgbox.getElementsByClassName('xcaptcha_error')[0].className =
        'xcaptcha_error xon'
    }
    if (type == 'error') {
      setTimeout(function() {
        that.imgbox.getElementsByClassName('xcaptcha_alert')[0].className =
          'xcaptcha_alert xout'
        setTimeout(function() {
          that.loadClose()
          if (call && typeof call == 'function') {
            call()
          }
        }, 201)
      }, 1500)
    }
  }

  //加载中
  captcha.load = function() {
    let that = this
    return that.alert('load')
  }

  //关闭加载中
  captcha.loadClose = function() {
    let that = this
    let alert = that.imgbox.getElementsByClassName('xcaptcha_alert')[0]
    if (alert) {
      alert.remove()
    }
  }

  //错误反馈
  captcha.error = function(msg, call) {
    let that = this
    that.loadClose()
    return that.alert('error', msg, call)
  }

  //刷新验证码
  captcha.refresh = async function() {
    let that = this

    if (that.imgbox.getElementsByClassName('xcaptcha_alert')[0]) {
      return false
    }

    that.cindex = 0
    that.poi = []
    that.span.innerHTML = '...'
    let xcaptcha_poi =
      that.maindiv.getElementsByClassName('xcaptcha_poi') || null
    if (xcaptcha_poi.length > 0) {
      let poiarr = []
      for (let i = 0; i < xcaptcha_poi.length; i++) {
        poiarr.push(xcaptcha_poi[i])
      }
      for (let i = 0; i < poiarr.length; i++) {
        poiarr[i].remove()
      }
    }
    // let oldsrc = that.img.src;
    // if (!oldsrc) {
    //   oldsrc = that.config.url;
    // }
    // let arr = oldsrc.split("?code");
    const data = await getSellerCaptcha({
      seller_id: getSellerId || getShopId,
      t: Math.random(0, 1000)
    })

    const { captcha, tip, key } = data.data
    that.img.src = captcha
    keys = key
    //获取顺序
    that.load()
    let imgs = new Image()
    imgs.src = captcha

    // imgs.onload = function() {
    that.loadClose()
    // let captcha_icon = data.captcha_icon;
    let captcha_icon_html = ''
    for (let i = 0; i < tip.length; i++) {
      captcha_icon_html += `<i class="icaptcha">${tip[i]}</i>${
        i < tip.length - 1 ? '、' : ''
      }`
    }
    that.span.innerHTML = captcha_icon_html
    // let myajax = new Ajax({
    //   type: "post",
    //   url: that.config.url,
    //   data: { act: "icon" },
    //   dataType: "json",
    //   success: function(data) {
    //     that.loadClose();
    //     let captcha_icon = data.captcha_icon;
    //     let captcha_icon_html = "";
    //     for (let i = 0; i < captcha_icon.length; i++) {
    //       captcha_icon_html +=
    //         '<i class="icaptcha-' + captcha_icon[i] + '"></i>';
    //     }
    //     that.span.innerHTML = captcha_icon_html;
    //   },
    // });
    // myajax.send();
    // };
    return false
  }

  //关闭验证码
  captcha.close = function() {
    let that = this
    that.maindiv.remove()
  }
  return captcha
}
