import { getRequest } from './api'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  getRequest('/system/config/menu').then(data => {
    if (data) {
      // 格式化router
      const fmtRoutes = fomatRoutes(data)
      // 添加到router
      router.addRoutes(fmtRoutes)
      // 将数据存入vuex
      store.commit('initRoutes', fmtRoutes)
    }
  })
}

export const fomatRoutes = (routes) => {
  const fmtRoutes = []
  routes.forEach(router => {
    let{
      path,
      component,
      name,
      iconCls,
      children
    } = router
    if (children && children instanceof Array) {
      // 递归
      children = fomatRoutes(children)
    }
    const fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component (resolve) {
        require(['../views/' + component + '.Vue'], resolve)
      }
    }
    fmtRoutes.push(fmRouter)
  })
  return fmtRoutes
}
