<template>
  <div >
        <b-navbar id="navbar" toggleable="lg"  type="dark" variant="succes">
            <b-navbar-brand href="/#/home">
                <img v-bind:src="imageSrc"   class="d-inline-block align-top navbarImage" alt="Kitten">
            </b-navbar-brand>
    
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                   
                </b-navbar-nav>
    
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                   
    
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                    </b-nav-item-dropdown>
    
                    <b-nav-item-dropdown right class="user">
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item href="#" to="/profile" >Profile</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="singout" to="/login">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import {singout} from '../services/security.js';
export default {
  data() {
    return {
        imageSrc: './assets/img/icon.png'
    };
  },
  methods: {
      profile(){
          window.location.href = '/#/profile'
      },
      singout(){
          console.log("hola")
          singout()
      }
  }
};
</script>

<style>
#navbar{
    width: 100%;
    background-color:rgb(58, 53, 53);
}
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: green;
}
.navbarImage{
    width: 50px;
    background: transparent;
}

</style>