import request from '@/utils/request'
// 机房管理
export function login(data) {
  return request({
    url: 'http://47.105.96.116:8082/ptcp-demo/api/login',
    method: 'post',
    data
  })
}
// admin登录
// export function login(data) {
//   return request({
//     url: 'http://47.105.96.116:8082/ptcp-demo/api/login/manage',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info\.*',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/vue-element-admin/',
    method: 'post'
  })
}
