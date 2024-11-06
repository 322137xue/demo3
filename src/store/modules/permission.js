import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  console.log("roles" + roles, "route" + route)
  if (route.meta && route.meta.roles) {
    console.log(route.meta, route.meta.roles)
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
        console.log(tmp.children)
      }
      res.push(tmp)
    }
  })
  console.log(res)
  return res
}

const state = {
  routes: [],
  addRoutes: []
}
console.log(state)

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
console.log(mutations)

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      console.log(resolve)
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
        console.log(accessedRoutes)

      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        console.log(accessedRoutes)

      }
      commit('SET_ROUTES', accessedRoutes)
      console.log(accessedRoutes)
      resolve()
    })

  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
