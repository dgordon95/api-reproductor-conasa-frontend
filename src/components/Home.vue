<template>
  <div class="container">
    <h1 align = center>BIENVENIDO</h1>
    <p>Por el momento solo puede acceder a su perfil. Consulte si sus datos sin los correctos</p>
  </div>
</template>


<script>
import {checkAuth} from '../services/security.js';
export default {
  data() {
      return {
        form: {
        },
      }
    },
  created(){
    if(checkAuth() == false)this.$router.push('Authenticationfailed')
  }
};
</script>

<style>

</style>
