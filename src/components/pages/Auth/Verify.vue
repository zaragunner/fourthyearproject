<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-12">
      <div class="mt-6 mb-4 text-center text-3xl font-extrabold text-gray-900">
       <h1 v-if="this.$store.state.site.site">{{this.$store.state.site.site.name}} </h1>
        <h2 class="mt-6 text-center text-2xl font-bold text-gray-500">
          Verify your account
        </h2>
        <p class="font-semibold text-xl text-gray-400"> A 6-digit verification code has been sent to your email address. Please enter the digits below to verify and activate your account </p>
      
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label  for="email" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="code" class="sr-only">Verification Code</label>
            <input v-model="code" id="code" name="code" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Verification Code" />
          

    
        </div>

          <button @click="verify()" type="submit" class="  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              
            </span>
                Verify
          </button>
        
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
 export default {
 
    name: 'Verify',
    data() {
      return {
         email: '',
     code: '',
      }
     
    },
    components: {
      
    },
    methods: {
      async verify(){
       await this.$store.dispatch('account/verify', {username: this.email , code: this.code})
       .then(this.$router.push('/login'))
      }
    }
 }
 </script>