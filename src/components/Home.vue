<template>
    <div class="container-fluid">
        <div id="main_div">
          <div id="div_h1"><h1 id="h1">MUSICA SIN LÍMITE</h1></div>
          <div id="div_h2"><h1 id="h2">Escucha el ultimo disco de tu artista de Spotify favorito</h1></div>
        </div>
      <div >     
        <b-input-group>
            <form id="searchVar" @submit="onSubmit">
                <b-input-group id="searchArtistInput"  class="mt-3">
                <b-form-input type="text"  placeholder="Introduzca el nombre del artista" v-model="artist" required></b-form-input>
                <b-input-group-append>
                  <b-button id="sumbit"  type="submit" variant="primary" :disabled="loading"><div class="lds-ring-container" v-if="loading" :disabled="loading">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>Buscar</b-button>
                </b-input-group-append>
              </b-input-group>
            </form>
        </b-input-group>
    </div>
    <b-alert class="alertDanger" :show="showAlert" variant="danger">{{ artisNotFoundError }}</b-alert>
    <div id="artist_card" v-show="imageVisible==true">
      <b-card id="card" no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img id="artistImg" v-bind:src="imageHref" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body>
              <b-card-text><br>
          <div id="cardItems">
          <p v-show="imageVisible==true">Seguidores:{{followers}}</p>
          
          <p v-show="imageVisible==true">Generos:{{genres}}</p>
          
          <p v-show="imageVisible==true">Enlace a su cuenta de Spotify:<a v-bind:href="accountUrl">{{accountUrl}}</a></p>
          
          <p v-show="imageVisible==true">Ultimo disco:<b-button v-show="imageVisible==true" id="btn-reproducir" v-on:click='onSubmit2()' type="submit" variant="primary" :disabled="loading1"><div class="lds-ring-container" v-if="loading1" :disabled="loading1">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>Reproducir</b-button><a v-bind:href="accountUrl"></a></p>
          </div>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
        <iframe id="reproductor" v-show="reproVisible==true" v-bind:src="this.albumUrl"   frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  </div>
  
</template>


<script>
import axios from 'axios';
import {checkAuth} from '../services/security.js';
import { baseUrlArtist } from '../config/parameters';
import { baseUrlArtists } from '../config/parameters';
export default {
  data() {
      return {
        form: {
         artist:''
        },
        
        loading: false,
        loading1: false,
        artist:'',
        artistId:'',
        imageHref:'',
        imageVisible:false,
        followers:'',
        genres:'',
        accountUrl:'',
        reproVisible:false,
        albumUrl:'',
        artisNotFoundError:'',
        showAlert:false
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
      axios.get(baseUrlArtist+this.artist)
      .then((response) => {
        this.loading = false
          if(response.data.artists.next == null){
            this.artisNotFoundError = 'Artista no encontrado';
            this.showAlert = true;
            this.imageVisible = false;
          }
          else{
            this.accountUrl = response.data.artists.items[0].external_urls.spotify
            this.imageHref = response.data.artists.items[0].images[0].url
            this.followers = response.data.artists.items[0].followers.total
            this.genres = response.data.artists.items[0].genres[0]
            this.artistId = response.data.artists.items[0].id
            this.imageVisible = true
            this.reproVisible=false
            this.showAlert = false;
          }
      },
       (err) => {
          this.loading = false;
          this.imageVisible = false;
          console.log(err)
      })
      
    }, 
    onSubmit2() {
      this.loading1 = true,
       axios.get(baseUrlArtists+this.artistId+'/albums')
      .then((response) => {
        this.loading1 = false
        this.reproVisible=true
        this.albumUrl = "https://open.spotify.com/embed/album/"+response.data.items[0].id
      
      },
       (err) => {
         this.loading1 = false
        console.log(err)
      })
    }
  },
  created(){
    if(checkAuth() == false)this.$router.push('Authenticationfailed')
  },
};
</script>

<style>
#main_div{
  color: #FFFFFF;
  width: 100%;
  background-image: url("/assets/img/fondo2.jpg");
  background-attachment: fixed; 
  background-size:100%;

  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  

  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center

}
#div_h1{
  margin: 2%;
  text-align: center;
}
#h1{
font-size: 70;
color:white;
font-family: fantasy
}
#div_h2{
  text-align: center;
}
#h2{
  font-size: 30;
}
#searchVar{
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
#searchArtistInput
{
  width: 70%;
}
#albums{
  align-self: auto;
}
#artist_card{
  
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
#card{
  background-image: url("/assets/img/spotyback.png");
}
#cardItems p {
  color: white;
}
#artistImg
{
  padding: 10%;
}
#btn-reproducir{
  width:75%;
}
@media screen and (max-width:870px) {
 #reproductor{
   width:1111;
   height:80;
 }
  #artistImg
{
  padding: 2%;
}
}
@media screen and (max-width:568px) {
 #h1{
  font-size: 50;
  color:white;
  font-family: fantasy
  }
 #h2{
    font-size: 20;
  }
}
@media screen and (max-width:414px) {
 #h1{
font-size: 30;
color:white;
font-family: fantasy
}
#h2{
  font-size: 15;
}
}
</style>
