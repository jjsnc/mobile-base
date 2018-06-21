/*
 * @Author: jjsnc
 * @Date:   2018-06-19 22:38:43
 * @Last Modified by:   jjsnc
 * @Last Modified time: 2018-06-19 22:41:11
 */
const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js' || key === './axios.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
