import { post, get } from '@utils/Request'

const { username } = JSON.parse(localStorage.getItem('user_info'))
// 获取用户个人信息
export const getMyDetail = () => get('/api/my/detail')

// 修改用户个人信息
export const postMyUpdate = (params) => post('/api/my/update', params)

// 修改密码
export const postPasswordUpdate = (params) => post('/api/my/pswupdate', { ...params, username })
