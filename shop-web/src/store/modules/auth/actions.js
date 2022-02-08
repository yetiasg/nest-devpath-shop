import router from '../../../router.js';
import config from '../../../config.js';

// helpers----------------------------------------------
const getJSON = async(url, options) =>{
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(response.message);
    const data = await response.json();
    return data;
};
  //------------------------------------------------------


export default{
    login: async (context, payload) => {
        const {email, password} = payload;
        try{
          const resData = await getJSON(`${config.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email, password
            })
          });
          let {access_token, refreshToken, userId} = resData;

          const userPayload = {
            access_token,
            refreshToken,
            userId,
          }
    
          context.commit('setUserData', userPayload);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userId', userId);
    
        }catch (error){
          console.log(error.message)
        }
      },

    async register(context, payload){
        const {email, password, passwordConfirmation} = payload;
        try{
            const resData = await getJSON(`${config.BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password,
                    passwordConfirmation
                })
            })

            const {access_token, refreshToken, userId} = resData;

            const userPayload = {
              access_token,
                refreshToken,
                userId,
            }

            context.commit('setUserData', userPayload);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);

        }catch (error){
            console.log("Can not register now")
        }
    },
    refreshAuth: async context => {
        const refreshToken = localStorage.getItem('refreshToken')
        if(refreshToken == '') throw new Error('Unauthorized')
    
        try{
          const resData = await getJSON(`${config.BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken
            })
          });

          const {access_token, refreshToken, userId} = resData;

            const userPayload = {
                access_token,
                refreshToken,
                userId
            }
            
            context.commit('setUserData', userPayload);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);

        }catch (error){
            if(error.status === 401){
                context.dispatch('logout')
            }
        }
    },
    tryLogin(context){
        const access_token = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refreshToken')
        const userId = localStorage.getItem('userId')

        let expiresIn = localStorage.getItem('expiresIn');

        expiresIn = +expiresIn - new Date().getTime();
        if(expiresIn < 0){
          return;
        }

        if(access_token.length > 0 && refreshToken.length > 0 && userId.length > 0){
            const userPayload = {
              access_token,
                refreshToken,
                userId,
            }
            context.commit('setUserData', userPayload)
        }else{
            context.dispatch('logout')
        }
    },
    logout: (context) =>{
        context.commit('logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        router.replace('/auth');
    },

    autoLogout: (context) => {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}