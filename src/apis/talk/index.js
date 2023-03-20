import { post, get } from '@utils/Request'

// const { username } = JSON.parse(localStorage.getItem('user_info'))

export const postUserList = params =>
  post('/api/friends/search', { searchKey: params })

export const postAddFriendRequest = username =>
  post('/api/friends/addRequest', { otherUsername: username })

export const getFriendApplication = () => get('/api/friends/requestList')

export const postFriendApplicationAgree = params =>
  post('/api/friends/agree', params)

export const postFriendApplicationRefuse = params =>
  post('/api/friends/refuse', params)

export const postFriendsList = params => post('/api/friends/list', params)
