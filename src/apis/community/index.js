import { post, get } from '@utils/Request'

export const postMomentAdd = params => post('/api/moments/add', params)

export const getMomentAll = () => get('/api/moments/all')

export const postMomentLikeChange = params =>
  post('/api/moments/likeChange', params)

export const postMomentCommentAdd = params =>
  post('/api/moments/commentAdd', params)

export const getMomentSelf = () => get('/api/moments/self')
