
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
       <h1 v-if="this.$store.state.site.site">{{this.$store.state.site.site.name}}</h1>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-500">
          Register
        </h2>
      
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">

            <div>
            <label  for="first-name" class="sr-only">First Name</label>
            <input v-model="firstName" id="first-name" name="firstName" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" />
          </div>

            <div>
            <label  for="last-name" class="sr-only">Surname Name</label>
            <input v-model="lastName" id="last-name" name="LastName" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" />
          </div>


          <div>
            <label  for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>

          <div>
            <label  for="phone" class="sr-only">Contact Number</label>
            <input v-model="phone" id="phone" name="phone" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contact Number" />
          </div>

        <div>
            <label  for="address-line1" class="sr-only">Line 1</label>
            <input v-model="addressLine1" id="address-line1" name="address-line1" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Line 1" />
          </div>       

           <div>
            <label  for="address-line2" class="sr-only">Line 2</label>
            <input v-model="addressLine2" id="address-line2" name="address-line2" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Line 2" />
          </div>      

           <div>
            <label  for="address-line3" class="sr-only">Line 3</label>
              <input v-model="addressLine3" id="address-line3" name="address-line3" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Line 3" />
          </div> 

           <div>
            <label  for="address-line4" class="sr-only">Line 4</label>
              <input v-model="addressLine4" id="address-line4" name="address-line4" type="text"  required="false" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Line 4 (optional)" />
          </div> 

           <div>
            <label  for="postcode" class="sr-only">Postcode</label>
              <input v-model="postcode" id="postcode" name="postcode" type="text"  required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Postcode" />
          </div> 
          
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password"  required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>

           <div>
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
          </div>

            
        </div>

        <div>
          <button @click="register()" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              
            </span>
           Register
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
 
    name: 'Register',
    data() {
      return {
          firstName : '',
          lastName: '',
          phone: '',
          email: '',
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          postcode: '',
          password: '',
          confirmPassword: ''
      }
     
    },
    components: {
      
    },
    methods: {
      async register(){
       await this.$store.dispatch('account/register', { 
         username : this.email,
          email: this.email,
          password: this.password,
          name: this.firstName + " " + this.lastName,
          given_name : this.firstName,
          family_name : this.lastName,
          phone_number : this.phone,
          address: this.addressLine1 + " " + this.addressLine2 + " " +  this.addressLine3 + " " + this.addressLine4  + " " +  this.postcode })
       .then(this.$router.push('/verify'))
      }
    }
 }
 </script>