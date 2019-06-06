<template>
  <div id="app" class="">
      
      <Navbar/>
      <!-- component matched by the route will render here -->
      <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'


export default {
  
  data() {
    return {
      imageSrc: './assets/img/back.png',
      message: 'Hello World',
    };
  },
  components: {
    'Navbar': Navbar
  },
  methods: {
    
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: black;
}
body{
  background-image: url("/assets/img/f2.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: grey !important;
}
.container{
  background:#F0F8FF;
  overflow:hidden;
  margin: 0 auto;
}
.lds-ring-container{
  position: absolute;
  rigth:50%;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  margin: 0px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>