import Vue from 'vue'
import Router from 'vue-router'
import login from './components/Login'
import index from './components/Index'
import prescription from './components/prescription'
import Expiration from './components/Expiration'
import home from './components/home'
import store from './store'
Vue.use(Router)

// export default new Router({
//   routes: 
// })

let constRouter = [
  {
    path: '/',
    name: '登录页',
    component: login
  },
  {
    path: '/index',
    name: '导航页',
    component: index,
    children:[{
      path: '/index/prescription',
      name: '处方',
      component: prescription,
    },
    {
      path: '/index/Expiration',
      name: '设置',
      component: Expiration,
    },
    {
      path: '/index/home',
      name: '首页',
      component: home,
    }
  ]
  },
]

let router = new Router({
  routes: constRouter
})

const whiteList = '/'

//let asyncRouter

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (whiteList === to.path) {
    next()
  }
  let token = store.state.token
  if (token.length) {
    next(true)
  } else {
    next('/')
  }
});

// function go (to, next) {
//   asyncRouter = filterAsyncRouter(asyncRouter)
//   router.addRoutes(asyncRouter)
//   next({...to, replace: true})
// }

// function save (name, data) {
//   localStorage.setItem(name, JSON.stringify(data))
// }

// function get (name) {
//   return JSON.parse(localStorage.getItem(name))
// }

// function filterAsyncRouter (routes) {
//   return routes.filter((route) => {
//     let component = route.component
//     if (component) {
//       switch (route.component) {
//         case 'MenuView':
//           route.component = MenuView
//           break
//         case 'PageView':
//           route.component = PageView
//           break
//         case 'EmptyPageView':
//           route.component = EmptyPageView
//           break
//         case 'HomePageView':
//           route.component = HomePageView
//           break
//         default:
//           route.component = view(component)
//       }
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children)
//       }
//       return true
//     }
//   })
// }

// function view (path) {
//   return function (resolve) {
//     import(`@/views/${path}.vue`).then(mod => {
//       resolve(mod)
//     })
//   }
// }

export default router
