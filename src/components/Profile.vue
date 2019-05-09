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
            <form
              @submit.prevent="onSubmit"
              method="put"
            >
            <b-list-group-item>Nombre: <input v-model="name" type="text"></b-list-group-item>
            <b-list-group-item>Apellido: <input v-model="surname" type="text"></b-list-group-item>
            <b-list-group-item>Contraseña: <input type="password" v-model="password" ></b-list-group-item>
            <br>
            <b-button id="EditSumbit" type="submit" variant="primary" :disabled="loading"><div class="lds-ring-container" v-if="loading" :disabled="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>Guardar cambios</b-button>
             </form>
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
      password:'',
      show: true,
      name: '',
      username: '',
      surname: '',
      email:'',
      showAlert: false,
      showSucces: false,
      textAlert: '',
      textOk: '',
      loading: false
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
    onSubmit() {this.loading = true,
      axios.put(baseUrlPut,{
          id:localStorage.getItem("id"),
          name: this.name,
          password: this.password,
          surname: this.surname
        },
        {
        headers: {
        'Content-Type': 'application/json',
        }
        })
        .then(response => {
          this.loading = false
          console.log(response);
          this.textOk = response.data.message
          this.showSucces = true
          this.showAlert = false
        })
        .catch(error => {
          this.loading = false
          console.log(error.response)
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
          this.showSucces = false
        });
    }
  },
  created(){
    if(checkAuth() == false)this.$router.push('Authenticationfailed')
    else this.loadProfile()
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
#EditSumbit{
  width:222px;
}
</style>
