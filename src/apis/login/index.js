import { post, get } from '@utils/Request'

// 注册接口
export const postSignIn = (params) => post('/api/user/register', params)

// 登录接口
export const postLoginIn = (params) => post('/api/user/login', params)

// 退出登录接口
export const getLoginOut = () => get('/api/user/logout')
