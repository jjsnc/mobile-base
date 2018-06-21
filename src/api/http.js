/*
 * @Author: jjsnc
 * @Date:   2018-06-19 22:38:55
 * @Last Modified by:   jjsnc
 * @Last Modified time: 2018-06-19 23:21:11
 */
import axios from './axios'
const fetch = (url, options = {}) => {
  let axiosConf = {
    // url: `?method=${url}`
    url: url
  }
  if (options.method && options.method.toLowerCase() === 'post') {
    // 如果是POST请求，初始化参数
    axiosConf.method = 'post'
    if (options.params) {
      axiosConf.params = options.params
    }
    if (options.onUploadProgress) {
      axiosConf.onUploadProgress = options.onUploadProgress
    }
    axiosConf.data = options.body || {}
  } else {
    // 不是POST请求就是GET请求！初始化参数
    axiosConf.method = 'get'
    axiosConf.params = options.body || {}
  }
  return axios(axiosConf)
    .then(res => {
      res.data.flag = true
      return res.data
    })
    .catch(err => {
      err.data || (err.data = {})
      if (err.data.msg) {
        console.log('fetchError =>', err.data.msg)
      } else {
        console.log('fetchError =>', err)
        err.data.msg = 'SYSTEM ERROR!'
      }
      err.data.flag = false
      return err.data
    })
}

/**
 * axios实现get
 */
const get = (url, params = {}) => {
  return fetch(url, {
    method: 'get',
    body: params
  })
}

/**
 * axios实现post
 */
const post = (url, data = {}) => {
  return fetch(url, {
    method: 'post',
    body: data
  })
}

export default {
  get,
  post
}
