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
          let {access_token, role, userId, firstName, lastName} = resData;

          const userPayload = {
            access_token,
            userId,
            role,
            firstName,
            lastName,
            email: resData.email
          }
    
          context.commit('setUserData', userPayload);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', userId);

          router.replace('/shop')
    
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

        const {access_token, role, userId} = resData;

        const userPayload = {
          access_token,
          userId,
          role
        }
    
        context.commit('setUserData', userPayload);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);

        router.replace('/shop')

      }catch (error){
        console.log("Can not register now")
      }
    },

    async tryLogin(context){
      const access_token = localStorage.getItem('access_token')
      const role = localStorage.getItem('role')
      const userId = localStorage.getItem('userId')
      if(!access_token || !role || !userId) return context.dispatch('logout');

      const userPayload = {
        access_token,
        userId,
        role
      }

      context.commit('setUserData', userPayload);
    },
    
    logout: (context) =>{
        context.commit('logout');
        localStorage.removeItem('role');
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        // router.replace('/shop');
    },

    autoLogout: (context) => {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}