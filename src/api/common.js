import { runtimeSendMessage } from '@u/common.js'
import { sign } from '@config/sign'

export const getGatherChannelHistory = data => {
  return runtimeSendMessage('GET', '/promotion/sourcehistory', data)
}

export const getGatherCoupons = data => {
  return runtimeSendMessage('GET', '/coupon/list', data)
}

export const getPromotionchannel = data => {
  return runtimeSendMessage('GET', '/promotion/promotionchannel', data)
}

export const postStat = data => {
  const signOption = sign(data)
  return runtimeSendMessage('POST', '/extend/stat', {
    sign: signOption,
    ...data
  })
}

export const getUnionPubContextInfo = data => {
  return runtimeSendMessage(
    'GET',
    '/common/getUnionPubContextInfo.json',
    data,
    'ali'
  )
}

export const getCloudvideo = data => {
  return runtimeSendMessage(
    'GET',
    '/h5/mtop.taobao.cloudvideo.video.queryforh5/1.0/',
    data,
    'business'
  )
}

export const getContactStatus = data => {
  return runtimeSendMessage('GET', '/extend/contactStatus', data)
}
