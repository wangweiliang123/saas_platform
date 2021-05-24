/**
 * 生成随机字符串
 * @returns {len}字符串长度
 */
export const randomString = (prefix: any, len = 32) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  if (!prefix) {
    return pwd
  } else {
    return '' + prefix + pwd
  }
}
