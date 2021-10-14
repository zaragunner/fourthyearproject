<template>
 <amplify-authenticator username-alias="email">
    <amplify-sign-up
     
      username-alias="email"
      :formFields="formFields"
    ></amplify-sign-up>
    <amplify-sign-in  username-alias="email"></amplify-sign-in>
  </amplify-authenticator>
</template>

<script>
export default {
    name: 'Login'
}
</script>
