const tmallContent = document.getElementById('J_RSPostageCont') // 天猫
const taobaoContent = document.getElementById('J_logistic') // 淘宝
const tmallgjContent = document.getElementById('J_RSPostageCont') // 天猫国际
const taobaojmContent = document.getElementsByClassName('description')[0] // 淘宝聚美

const vipContent = document.getElementById('J-pi-price-box') // 唯品会

const jdContent = document.getElementsByClassName('summary-first')[0] // 京东
const jdgjContent = document.getElementById('summary-wrap') // 京东国际
const cartvContent = document.getElementById('skuidComp') // 京东电子书
const pingouContent = document.querySelector('.summary.pingou-summary') // 京东拼购
const promotionContent = document.querySelector('.summary-first') // 京东医药

export const taoxiDocument =
  tmallContent || taobaoContent || tmallgjContent || taobaojmContent

export const vipshopDocument = vipContent

export const jdcomDocument =
  jdContent || jdgjContent || cartvContent || pingouContent || promotionContent
