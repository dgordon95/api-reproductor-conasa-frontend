<template>
     <div class="container">
         <b-form v-on:submit.prevent="onSubmit"  >
      <b-form-group
        id="input-group-1"
        label="Introduzca su nueva contraseña"
        label-for="input-1"
        >
        <b-form-input
          id="input-1"
          type="password"
          v-model="form.pass"
          required
          placeholder="Contraseña"
        >
        </b-form-input>
        
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Confirmar contraseña:"
        label-for="input-2"
        >
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.pass2"
          required
          placeholder="Confirmar contraseña"
        ></b-form-input>
      </b-form-group>
       <b-button id="sumbit" type="submit" variant="primary" :disabled="loading">
        <div class="lds-ring-container" v-if="loading" :disabled="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        Siguiente</b-button>
      <b-button id="reset" type="reset" variant="danger" :disabled="loading">Reiniciar</b-button>
</b-form>
<b-alert class="alertDanger" :show="showAlert" variant="danger">{{ textAlert }}</b-alert>
    <b-alert class="alertSucces" :show="showSucces" variant="success">{{textSucces}} </b-alert>
    </div>
</template>
<script>
import axios from 'axios';
import { baseUrlPut } from '../config/parameters';
export default {
  
  data() {
    return {
       form: {
          pass : '',
          pass2 : ''
        },
     loading:false,
     showAlert:false,
     showSucces:false,
     loading:false,
     textAlert:'',
     textSucces:''
    }
    
  },
  components: {
    
  },
  methods: {
   onSubmit() {
      this.loading = true
       if(this.form.pass === this.form.pass2){
        
         axios.put(baseUrlPut,{
          id:localStorage.getItem("id"),
          password: this.form.pass,
        },
        {
        headers: {
        'Content-Type': 'application/json',
        }
        })
        .then(response => {
          this.loading = false
          console.log(response);
          this.textSucces = response.data.message
          this.showSucces = true
          this.showAlert = false
          this.$router.push('home')
        })
        .catch(error => {
          this.loading = false
          console.log(error.response)
          this.textAlert = error.response
          this.showAlert = true
          this.showSucces = false
        });
       }else{
          this.textAlert = 'Las contraseñas no coinciden'
          this.showAlert = true
          this.showSucces = false
       }
   }
  },
  created (){
    localStorage.setItem('id', this.$route.query.id);
    localStorage.setItem('apikey', this.$route.query.apikey);
    if(this.$route.query.verify === 'Yes')localStorage.setItem('verify', true)
    else localStorage.setItem('verify', false)
  }
};
</script>
    
<style>

</style>