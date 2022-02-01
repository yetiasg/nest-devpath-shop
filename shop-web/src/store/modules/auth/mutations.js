export default{
setUserData(state, payload){
    state.access_token = payload.access_token
    state.refreshToken = payload.refreshToken
    state.userId = payload.userId
    state.expiresIn = payload.expiresIn
    state.isAuth = true
  },

  logout(state){
    state.access_token = null
    state.refreshToken = null
    state.userId = null
    state.isAuth = false
  },

  setAutoLogout(state){
    state.didAutoLogout = true;
  }
}