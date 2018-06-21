/*
 * @Author: jjsnc
 * @Date:   2018-06-19 22:36:20
 * @Last Modified by:   jjsnc
 * @Last Modified time: 2018-06-19 23:25:07
 */

import axios from 'axios'
axios.defaults.timeout = 15000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8'
export default axios
