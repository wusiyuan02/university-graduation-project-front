import { post, get } from '@utils/Request'

// 获取用户个人信息
export const getMyDetail = () => get('/api/my/detail')

// 修改用户个人信息
export const postMyEdit = (params) => post('/api/my/edit', params)
