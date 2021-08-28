/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier: 数值过滤器
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime: 2020-02-26 16:16:01
 */
export const endZero = (value, bit = 2) => {
  const result = Number(value)
  return !isNaN(result)
    ? result.toFixed(bit).replace(/(\.0+$)|(?:(?!(\.\d+))0+$)/, '')
    : value
}

export const percent = (value, bit = 2) => {
  const result = Number(value)
  return !isNaN(result) && Number(value) !== 0
    ? endZero(value, bit) + '%'
    : value
}

export default [
  {
    name: 'zero',
    fn: endZero
  },
  {
    name: 'percent',
    fn: percent
  },
  {
    name: 'decimals',
    fn(value, bit = 2) {
      const result = Number(value)
      return !isNaN(result) && result > 0 ? result.toFixed(bit) : '0'
    }
  }
]
