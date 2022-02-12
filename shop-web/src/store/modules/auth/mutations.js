export default{
  setUserData(state, payload){
    state.access_token = payload.access_token
    state.userId = payload.userId
    state.isAuth = true
  },

  logout(state){
    state.access_token = null
    state.userId = null
    state.isAuth = false
  },
}