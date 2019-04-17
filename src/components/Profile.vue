<template>
  <div class="container">
<b-card no-body class="pestañas">
    <b-tabs card>
      <b-tab no-body title="Perfil">
        <b-list-group>
            <b-list-group-item>Nombre de usuario: {{username}}</b-list-group-item>
            <b-list-group-item>Nombre: {{name}}</b-list-group-item>
            <b-list-group-item>Apellido: {{surname}}</b-list-group-item>
            <b-list-group-item>Email: {{email}}</b-list-group-item>
        </b-list-group>
      </b-tab>

      <b-tab no-body title="Editar">
        <b-list-group>
           <b-alert class="alertDanger" :show="showAlert" variant="danger">{{ textAlert }}</b-alert>
  <b-alert class="alertSucces" :show="showSucces" variant="success">{{ textOk }}</b-alert>
            <b-list-group-item>Nombre: <input type="text"></b-list-group-item>
            <b-list-group-item>Apellido: <input type="text"></b-list-group-item>
            <b-list-group-item>Contraseña: <input type="text"></b-list-group-item>
             <br>
     <b-button id="sumbit" type="submit" variant="primary">Guardar cambios</b-button>
        </b-list-group>
      </b-tab>
     
      
    </b-tabs>
  </b-card>
  </div>
</template>


<script>
import axios from 'axios';
import { baseUrlGet } from '../config/parameters';
import { baseUrlPut } from '../config/parameters';
import {checkAuth} from '../services/security.js';
export default {
  data() {
    return { 
      form: {
        id:'',
        name: '',
        surname: '',
        password:''
      },
      show: true,
      name: '',
      username: '',
      surname: '',
      email:'',
      showAlert: false,
      showSucces: false,
      textAlert: '',
      textOk: ''
    }
  },
  methods: {
    loadProfile() {
      axios.get(baseUrlGet+localStorage.getItem("id")).then((response) => {
        this.username = response.data.username
        this.name = response.data.name
        this.surname =response.data.surname
        this.email = response.data.email
      }, (err) => {
        console.log(err)
      })
    },
    onSubmit() {
      axios.put(baseUrlPut,{
          id:localStorage.getItem("id"),
          name: this.form.name,
          password: this.form.password,
          surname: this.form.surname
        })
        .then(response => {
          console.log(response);
          this.textOk = response['data']
          this.showSucces = true
          this.showAlert = false
          this.delete()
        })
        .catch(error => {
          console.log(error.response.data)
          let arrayError = error.response.data
          if(Array.isArray(arrayError)){
              let textAlert = ""
              arrayError.forEach(function(element) {
                textAlert += element.error+ "     "
              });
              this.textAlert = textAlert
          } else {
            this.textAlert = error.response.data.error
          }

          this.showAlert = true
        });
    }
  },
  created(){
    if(checkAuth() == false)this.$router.push('Authenticationfailed')
    this.loadProfile()
    
  },
  mounted() {
    
  }
}
</script>

<style>
.pestañas
{
    /*padding-left: 35%;*/
}
</style>
