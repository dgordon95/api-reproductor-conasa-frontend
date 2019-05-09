<template>
  <div class="container">
    <div id="main_div" class="">
      <img v-bind:src="img" class=" img-responsive mobileImg img"  alt="Kitten">
      <h1 id="main_h1">Música sin límites</h1>
    </div>
   
  </div>
</template>


<script>
import {checkAuth} from '../services/security.js';
export default {
  data() {
      return {
        img: './assets/img/mobileSpoty2.png',
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
#main_div{
  background-color: #3F3F65;
  color: #FFFFFF;
}
#main_h1{
  font-weight :70;
  font-size: 70;
  font-family:Verdana;
  margin-left: 20%;
 
}
.img{
  float: left;
  width: 600px;
}
</style>
