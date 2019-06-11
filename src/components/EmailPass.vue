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
       <b-button id="sumbit" type="submit" variant="primary" :disabled="loading"><div class="lds-ring-container" v-if="loading" :disabled="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>Siguiente</b-button>
      <b-button id="reset" type="reset" variant="danger" >Reiniciar</b-button>
</b-form>
    <b-alert class="alertDanger" :show="showAlert" variant="danger">{{ textAlert }}</b-alert>
    <b-alert class="alertSucces" :show="showSucces" variant="success">Se ha enviado un email con los pasos a realizar.</b-alert>
    </div>
</template>
<script>
import axios from 'axios';
import { baseUrlGetByEmail } from '../config/parameters';
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
     verify: '',
     loading: false,
     showAlert: false,
     showSucces: false
    };
  },
  components: {
    
  },
  methods: {
   onSubmit() {
     this.loading = true
        axios.get(baseUrlGetByEmail+this.email)
      .then((response) => {
         this.loading = false
          this.name = response.data.name
          this.id = response.data.id
          this.apikey = response.data.apikey
          this.verify = response.data.verify
          this.showSucces = true
          this.showAlert = false
      }, (err) => {
         this.loading = false
         this.textAlert= err.response.data.message
         this.showAlert = true
         this.showSucces = false
        console.log(err)
      })
      
   }
  }
};
</script>
    
<style>
.lds-ring{
    white-space: 300px;
  }

</style>