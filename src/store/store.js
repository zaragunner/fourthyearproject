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
                addToCart(state, product){
                    state.cart.push(product)
                },
                clearCart(state){
                    state.cart = [];
                }

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
                
                async addToCart({commit, state}, product ){
                    commit('addToCart' , product)
                    console.log("State.cart " + JSON.stringify(state.cart))
                },

                async clearCart({commit}){
                    commit('clearCart')
                }
                

            },
        }
    }
});

export default store;