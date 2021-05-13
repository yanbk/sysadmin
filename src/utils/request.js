import axios from 'axios'
import { Message } from 'element-ui'
import { store } from '@/store'
// import { getStorage } from '@/utils/storage'
// import { store } from '../store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 100000 // request timeout
})
service.interceptors.request.use(
  config => {
    const token = store.state.user.token
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      if (res.code !== 0) {
        // MessageBox.confirm('请重新登录', '登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/LoginOut')
        // })
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
