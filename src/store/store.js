import { Auth } from 'aws-amplify'
import Vuex from 'vuex'
import router from '@/router/routes.js'
//reference
//https://morioh.com/p/33e60f3dbb90



Auth.configure({
    Auth: {
        UserPoolId: 'eu-west-1_tiPReDPPq',
        UserPoolName: "FYP-Dev2",
        AppClientID: "3llbmpmbmd9s8lck1jakf2agkd",
        AppClientSecret: "atn16afel41p8s8bjde46p0db6i5thblh16lpsrhf7ptiqreib6",
        AppClientIDWeb: "5pfbmdsjcf7ppp0sm6ivr4i2il"
      },
});

const store = new Vuex.Store({
    modules: {
        account: {
            namespaced: true,
            state: {
                tempUser : null,
                user: null,
                loginStatus:null,
               authStatus: false,
                groups: null,
                cart: [],
            },
            mutations: {
                user(state, user) {
                    state.user = user;
                },
                tempUser(state, user) {
                    state.tempUser = user;
                },
                loginStatus(state, error){
                    state.loginStatus = error;
                },
                authStatus(state, status){
                    state.authStatus = status;
                },

                groups(state, groups){
                    state.groups = groups
                },
               

            },
            actions: {
                async login({commit}, { email, password }) {
                    console.log(email , password)
                    commit('loginStatus' , null)
                    try {
                        const user = await Auth.signIn(email, password)
                            commit('user', user);
                            console.log(user)
                            commit('authStatus', true)
                            await store.dispatch('account/fetchUser')
                            .then(await store.dispatch('account/getGroups'))
                            return true;
                    } catch (err) {
                        console.log(`Error in login func Login Error [${err}]`)
                    return false;
                    }
                },
                
                async fetchUser({ commit  }) {
                    try {
                       await Auth.currentSession();
                        commit('authStatus' , true)
                        const user = await Auth.currentAuthenticatedUser()
                        commit('user', user)

                       const token = user.getSignInUserSession().getIdToken().getJwtToken();
                       localStorage.setItem('JWT', token);

                       console.log('state' + JSON.stringify(store.state.account.authStatus))
                       return true;

                    } catch (err) {
                        await Auth.signOut();
                        commit('user', null);
                        localStorage.removeItem('JWT');
                        commit('authStatus', false);

                        return false;
                    }
                },
                async logout({ commit }) {
                    await Auth.signOut()
                    commit('authStatus', false)
                    localStorage.removeItem('JWT')
                    localStorage.removeItem('Cart')
                    localStorage.removeItem('Total')
                    await store.dispatch('cart/clearCart')
                    // this.store.dispatch('cart/clearCart')
                    commit('user', null)
                    commit('loginStatus' , null)
                    commit('groups', null)
                    router.push('/login')
                    
                    return true;
                
                },

                async register({commit} ,{username, email, password, name, given_name, family_name, phone_number, address}) {
                    try {
                        console.log(username)
                        console.log( given_name)
                     const user = await Auth.signUp({
                           username,
                            password,
                            attributes: {
                                name,
                                given_name,
                                family_name,
                                email,          // optional
                                phone_number,   // optional - E.164 number convention
                                address
                            }
                        });
                        commit('tempUser' , user)
                          console.log(user);
                    } catch (error) {
                        console.log('error signing up:', error);
                    }
                },

                async verify({commit} , {username, code}) {
    
                    try {
                      const user = await Auth.confirmSignUp(username, code);
                      commit('tempUser' , user)
                    } catch (error) {
                        console.log('error confirming sign up', error);
                    }
                },

                async getGroups({commit}){
                    const user =  await Auth.currentAuthenticatedUser();
                    // Returns an array of groups
                    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
                    console.log(groups)
                    commit('groups', groups)
                },
                
               
            },
        },

        cart : {
            namespaced: true,
            state: {
                cart : [],
                total: 0

        },
        mutations :{
            addToCart(state, product){
                state.cart.push(product)
               var cartItems = JSON.stringify(state.cart)
                localStorage.setItem('Cart', cartItems)
            },
            clearCart(state){
                state.cart = [];
                state.total = 0
                localStorage.removeItem('Cart')
                localStorage.removeItem('Total')
            },
            addTotal(state , price){
                state.total += price
                console.log(state.total)
                localStorage.setItem('Total' , state.total)
            }
        },
        actions: {
            async addToCart({commit}, product ){
                commit('addToCart' , product)
                var price = product.price.netprice
                commit('addTotal', price )
                
                
            },

            async clearCart({commit}){
                commit('clearCart')
            },

            async checkLocalStorage ({state}){
                try{
                   var total = JSON.parse(localStorage.getItem('Total'))
                   if(total!= null){
                    state.total = total
                   }
                   else state.toal = 0
                  
                   var cart = JSON.parse(localStorage.getItem('Cart'))
                   if(cart != null){
                    state.cart = cart
                   }
                   
                }
                catch
                {
                    console.log("ls empty")

                }
            }

        }
    },
    site : {
        namespaced: true,
        state: {
            site : null,
            theme : null
    },
    mutations :{
        site(state, site) {
            state.site = Object.assign({}, site)
        },

        theme(state, theme){
            state.theme = Object.assign({}, theme)
        }
   
    },
    actions : {
        async setSite({commit}, site ){
            commit('site' , site) 
            
        },

        async setTheme({commit}, theme){
            commit('theme', theme)
        }
    }
}
}
});

export default store;