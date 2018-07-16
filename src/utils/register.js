import request from '@/utils/request'

export function getCategory () {
  return request({
    url: '/getCategory',
    method: 'get'
  })
}

export function getTag (cId) {
  return request({
    url: `/getTag/${cId}`,
    method: 'get'
  })
}

export function toEmail (id) {
  return request({
    url: `/toEmail/${id}`,
    method: 'get'
  })
}