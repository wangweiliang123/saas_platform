'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.downloadFile = exports.blobToFile = void 0
/**
 * blob 转 file
 * @param theBlob blob
 * @param fileName 文件名
 * @param fileType 文件类型
 */
const blobToFile = (theBlob, fileName, fileType) => {
  let file = new window.File([theBlob], fileName, { type: fileType })
  return file
}
exports.blobToFile = blobToFile
/**
 * 文件下载
 * @param src 文件地址
 * @param fileName 文件名
 */
const downloadFile = (src, fileName) => {
  let a = document.createElement('a')
  if (fileName) {
    a.download = fileName
  }
  a.href = src
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
exports.downloadFile = downloadFile
