import { Auth } from 'aws-amplify'
import Vuex from 'vuex'
import router from '@/router/routes.js'
//reference
//https://morioh.com/p/33e60f3dbb90
const store = new Vuex.Store({
    modules: {
        account: {
            namespaced: true,
            state: {
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
                    commit('loginStatus' , null)
                    try {
                        const user = await Auth.signIn(email, password)
                            commit('user', user);
                            commit('authStatus', true)
                            await store.dispatch('account/fetchUser')
                            return true;
                    } catch (err) {
                        console.log(`Login Error [${err}]`)
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
                    // this.store.dispatch('cart/clearCart')
                    commit('user', null)
                    commit('loginStatus' , null)
                    router.push('/login')
                    
                    return true;
                
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
                var price = product.price
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
    }
    }
});

export default store;