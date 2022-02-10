export default{
    getUserId(state){
        if(!state.userId || !state.access_token) return null
        else return state.userId
    },
    getToken(state){
        if(!state.userId || !state.access_token) return null
        else return state.access_token
    }
}