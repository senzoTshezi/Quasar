import { LocalStorage } from 'quasar'
export default  ( { router } ) => {

  // ADD NAVIGATION GUARD
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if(!loggedIn && to.path !== "/auth"){
      next('/auth')
    }else{
      next()
    }
    
  })
}
