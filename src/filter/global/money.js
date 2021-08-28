/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier: 金额过滤器
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime: 2020-02-26 16:16:01
 */

import { endZero } from './number'

export const centToRmb = (value) => {
  const result = Number(value)
  return !isNaN(result) && result !== 0 ? result / 100 : value
}

export const price = (value) => {
  const result = Number(value)
  return !isNaN(result) && result !== 0 ? '￥' + value : value
}

export const tenThousand = (
  value,
  symbol = '万',
  bit = 1
) => {
  const result = Number(value)
  return !isNaN(result) && result >= 10000
    ? endZero((result / 10000).toFixed(bit)) + symbol
    : value
}

export default [
  {
    name: 'tenThousand',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value, bit = 1) {
      return tenThousand(value, '万', bit)
    }
  },
  {
    name: 'tenThousandW',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value, bit = 1) {
      return tenThousand(value, 'W', bit)
    }
  },
  {
    name: 'tenThousandComma',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value, bit = 1) {
      if (!value) {
        return value
      }

      const [intPart, floatPart] = String(value).split('.')
      // 将整数部分逢三断一加逗号
      const intPartFormat = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

      return intPartFormat + (floatPart ? '.' + floatPart.slice(0, bit) : '')
    }
  },
  {
    name: 'centToRmb',
    fn(value) {
      return centToRmb(value)
    }
  },
  {
    name: 'price',
    fn(value) {
      return price(endZero(value))
    }
  },
  {
    name: 'dollar',
    fn(value) {
      return '$' + value
    }
  }
]
