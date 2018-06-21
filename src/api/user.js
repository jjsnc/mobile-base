/*
 * @Author: jjsnc
 * @Date:   2018-06-19 22:39:54
 * @Last Modified by:   jjsnc
 * @Last Modified time: 2018-06-19 23:21:23
 */
import http from './http'
const addressList = (opts) => {
  const url = '/address/getList'
  return http.post(url, opts)
}

export default {
  addressList
}
