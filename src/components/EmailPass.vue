<template>
     <div class="container">
         <b-form v-on:submit.prevent="onSubmit"  >
      <b-form-group
        id="input-group-1"
        label="Direccion de correo electronico:"
        label-for="input-1"
        >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>
       <b-button id="sumbit" type="submit" variant="primary" >
       
        
        Siguiente</b-button>
      <b-button id="reset" type="reset" variant="danger" >Reiniciar</b-button>
</b-form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  
  data() {
    return {
        form: {
            email:''
        },
     email: '',
     id: '',
     name: '',
     apikey: '',
     verify: ''
    };
  },
  components: {
    
  },
  methods: {
   onSubmit() {
        axios.get('http://localhost/api-reproductor-practica-conasa/public/api/useremail/'+this.email)
      .then((response) => {
          this.name = response.data.name
          this.id = response.data.id
          this.apikey = response.data.apikey
          this.verify = response.data.verify
        console.log(response.data)
      }, (err) => {
        console.log(err)
      })
      
   }
  }
};
</script>
    
<style>

</style>