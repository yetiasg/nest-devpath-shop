export default{
  setUserData(state, payload){
    state.access_token = payload.access_token
    state.userId = payload.userId
    state.isAuth = true,
    state.firstName = payload.firstName,
    state.lastName = payload.lastName,
    state.email = payload.email
  },

  logout(state){
    state.access_token = null
    state.userId = null
    state.isAuth = false
    state.firstName = null
    state.lastName = null
    state.email = null
  },
}