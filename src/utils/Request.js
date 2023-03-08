import { redirect } from 'react-router-dom'

import { message } from 'antd'

import axios from 'axios'

const cancelToken = axios.CancelToken
const source = cancelToken.source()

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.cancelToken = source.token // 全局添加cancelToken
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => { })
    }
    if (error?.response) {
      switch (error.response.status) {
        case 500:
          message.destroy()
          message.error(error.response?.message || '服务器系统内部错误')
          break
        case 401:
          source.cancel()
          message.destroy()
          message.error(error?.response?.data?.message || '未登录', 1, () => {
            redirect('/login')
          })
          break
        case 403:
          message.destroy()
          message.error(error.response?.message || '无权限执行此操作')
          break
        case 404:
          message.destroy()
          message.error(error.response?.message || '未找到此接口')
          break
        case 408:
          message.destroy()
          message.error(error.response?.message || '请求超时')
          break
        default:
          message.destroy()
          message.error(error.response?.message || '未知错误')
      }
    } else {
      message.destroy()
      message.error('服务器忙，请稍后重试')
    }
    return Promise.resolve(error.response)
  }
)

/**
 * 封装get方法
 * @param {*} url 请求url
 * @param {*} params 请求参数
 * @param {*} callback 回调函数
 * @returns {Promise}
 */

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          'h5-requested-with': 'web',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 封装post请求 JSON请求
 * @param {*} url 请求url
 * @param {*} params 请求参数
 * @returns {Promise}
 */
export const post = (url, params) => {
  const config = {
    headers: {
      'h5-requested-with': 'web',
      'Content-Type': 'application/json'
    }
  }
  params = typeof params === 'string' ? params : JSON.stringify(params)
  return new Promise((resolve, reject) => {
    axios.post(url, params, config).then(
      (response) => {
        resolve(response?.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
