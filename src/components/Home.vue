<template>
  <div class="container">
    <div id="main_div" class="">
      <img v-bind:src="img" class=" img-responsive mobileImg img"  alt="Kitten">
      <h1 id="main_h1">Música sin límites</h1>
    </div>
    <div>
  <b-input-group>
    <h2>Busque un artista:</h2>
    <b-form-input type="text" v-model="artist"></b-form-input>
    <b-input-group-append>
       <b-button id="sumbit" v-on:click='onSubmit()' type="submit" variant="primary">Buscar</b-button>
    </b-input-group-append>
  </b-input-group>
</div>
    <div>
      <b-img id="imageArtist" v-bind:src="imageHref" fluid alt="Responsive image" v-show="imageVisible==true"></b-img>
      <br>
      <p v-show="imageVisible==true">Seguidores:{{followers}}</p>
      <br>
      <p v-show="imageVisible==true">Generos:{{genres}}</p>
      <br>
      <p v-show="imageVisible==true">Enlace a su cuenta de Spotify:<a v-bind:href="accountUrl">{{accountUrl}}</a></p>
      
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import {checkAuth} from '../services/security.js';
import { baseUrlArtist } from '../config/parameters';
export default {
  data() {
      return {
        form: {
         artist:''
        },
        img: './assets/img/mobileSpoty2.png',
        total:'',
        artist:'',
        imageHref:'',
        visible:false,
        followers:'',
        genres:'',
        accountUrl:''
      }
    },
    methods: {
      onSubmit() {
      axios.get(baseUrlArtist+this.artist)
      .then((response) => {
        this.accountUrl = response.data.artists.items[0].external_urls.spotify
        this.imageHref = response.data.artists.items[0].images[0].url
        this.followers = response.data.artists.items[0].followers.total
        this.genres = response.data.artists.items[0].genres[0]
        this.imageVisible = true
      },
       (err) => {
        console.log(err)
      })
    }, 
  },
  created(){
    if(checkAuth() == false)this.$router.push('Authenticationfailed')
  },
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
#imageArtist{
  width: 30%;
  height: 35%;
  border: black 15px solid;
  float:left;
}
</style>
