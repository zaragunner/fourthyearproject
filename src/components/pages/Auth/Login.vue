
<template>

  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <Toast/>
    <div class="max-w-md w-full space-y-8">
      <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
       <h1 v-if="this.$store.state.site.site">{{this.$store.state.site.site.name}}</h1>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-500">
          Sign in to your account
        </h2>
      
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label  for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <span @click="showToast">
             Don't have an account? <router-link to='/register'> <p class="text-blue-600">Register now!</p></router-link>
            </span>
          </div>
        </div>
<div class=" justify-items-center  ">


    
          

        <div class="inline-block w-full  ">
          <span @click="signIn()" type="submit" class="mx-auto group relative w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              
            </span>
            Sign in
          </span>
        
        </div>

       
        
        
          </div>
      </form>
  
    </div>

  
    
     <!-- <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{user.username}}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator> -->
  </div>
</template>



<script>
import { onMounted } from '@vue/runtime-core'
import Toast from 'primevue/toast';
 export default {
 
    name: 'Login',
    components:{
      Toast
    },
    data() {
      return {
         email: '',
      password: '',
      siteName:''
      }
     
    },
    async onMounted(){
     
      
      }


      
  ,
    methods: {
      async signIn(){
       await this.$store.dispatch('account/login', {email: this.email , password: this.password}).then(result => {
        if(result == true){
          if(this.$store.state.account.groups =='Public' ){
          this.$router.push('/')
          }
          else if(this.$store.state.account.groups =='Admin' ){
              this.$router.push('/contentmanagement')
          }
          
         }
         else{
           console.log("failure" , result)
           this.$toast.add({severity:'error', summary: result , life: 1500});
               
         }
      
       })
  
      
        
    },

   
    }
 }
 </script>