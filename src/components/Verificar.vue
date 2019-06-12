<template>
   <div id='verify' class="container">
       <h1>ULTIMO PASO</h1>
      <p >Gracias por registrarse, pulse este boton para verificar su cuenta y acceda a todo el contenido de esta pagina.</p>
       <b-button id='verifyBtn' block variant="primary" v-on:click="onSubmit" >Verificar</b-button>
   </div>   
</template>
<script>
import axios from 'axios';
import { baseUrlPut } from '../config/parameters';
import { baseUrlGet } from '../config/parameters';
import { baseUrlLogin} from '../config/parameters';
export default {
  
  data() {
    return {
      verify:''
    }
    
    },
  methods: {
    onSubmit() {
        console.log("entra")
        this.loading = true,
      axios.put(baseUrlPut,{
          id:localStorage.getItem("id"),
          verify: true,
        },
        {
        headers: {
        'Content-Type': 'application/json',
        }
        })
        .then(response => {
          this.loading = false
          localStorage.setItem('verify', true)
          console.log(response.data)
          this.$router.push('home')
        })
        .catch(error => {
          this.loading = false
          console.log(error.response)
          let arrayError = error.response.data
        });
    }
  },
  created(){
    
      axios.get(baseUrlGet+this.$route.query.id)
      .then((response) => {
        localStorage.setItem('verify', response.data.verify);
      }, (err) => {
        console.log(err)
      })


        localStorage.setItem('id', this.$route.query.id);
        localStorage.setItem('apikey', this.$route.query.apikey);
        
        

    },
};
</script>

<style>
#verify{
  text-align: center;
  
}
#verifyBtn{
  padding:2%;
  margin: 2%;
  width: 50%;
  display:block;
  margin-left: auto;
  margin-right: auto;
}
</style>