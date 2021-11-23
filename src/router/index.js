import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)
import axios from 'axios'
import store from '../store'
const routes = [
  {
    path: '/',
    component: Home,
    //redirect: '/index',
    children:[{
      path:'/index',
      name:'Index',
      component:Index
    },
    // {
    //   path:'/sys/roles',
    //   name:'Role',
    //   component:Role
    // },
    // {
    //   path:'/sys/users',
    //   name:'User',
    //   component:User
    // },
    // {
    //   path:'/menus',
    //   name:'Menu',
    //   component:Menu
    // },
    {
      path:'/userCenter',
      name:'UserCenter',
      component: () => import('../views/UserCenter.vue'),
      meta:{
        title:"用户中心"
      }
    }
  ]
  },
  {
    path: '/login',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//解决重复点击标签页控制台报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next)=>{

  let hasRoute = store.state.menus.hasRoute
  let token = localStorage.getItem("token");
   //console.log(!hasRoute);
   if (to.path=='/login') { 
  next();
   }else if (!token) {
    next({path:'/login'})
   }else if (token && !hasRoute) {
     axios.get("/sys/menu/nav",{
       headers:{
         Authorization:localStorage.getItem("token")
       }
     }).then(res=>{
       //console.log(res.data.data);
       //获取menuList
       store.commit('setMenuList', res.data.data.nav)
       //获取用户权限
       store.commit('setPermList', res.data.data.authoritys)
   
       //动态绑定路由
       let newRoutes = router.options.routes
       res.data.data.nav.forEach(menu=>{
         if(menu.children){
          //  console.log(menu.children);
           menu.children.forEach(e=>{
             //转成路由
             let route =menuToRoute(e)
             //把路由添加都路由管理器中
             if (route) {
               newRoutes[0].children.push(route)
             }
           })
         }
       })
        //console.log(newRoutes);
       router.addRoutes(newRoutes)
       hasRoute=true
       store.commit("changeRouteStatus",hasRoute)
     })
   }
  
  next()
})
const menuToRoute=(menu)=>{
  if (!menu.component) {
    return null
  }
  let route ={
    path:menu.path,
    name:menu.name,
    meta:{
      icon:menu.icon,
      title:menu.title,
    }
  }
  route.component = () => import('@/' + menu.component +'.vue')
  return route
}
export default router
