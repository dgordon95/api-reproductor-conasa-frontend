<template>
  <div id="contenedor2" class="container" >
    <img v-bind:src="imageSrc" class="d-inline-block align-top icon" alt="Kitten">
    <b-alert class="alertDanger" :show="showAlert" variant="danger">{{ textAlert }}</b-alert>
    <b-form v-on:submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Direccion de correo electronico o nombre de usuario:"
        label-for="input-1"
        >
        <b-form-input
          id="input-1"
          v-model="form.emailUsername"
          type="email"
          required
          placeholder="Email o nombre de usuario"
        ></b-form-input>
      </b-form-group>

     

      <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          required
          placeholder="Contraseña"
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
      id="checkbox-3"
      name="checkbox-3"
      value="accepted"
      unchecked-value="not_accepted"
      
    >
      <label class="texto-checkbox" >Guarda la informacion de inicio de sesion</label>
    </b-form-checkbox>
       
      <b-button id="sumbit" type="submit" variant="primary" :disabled="loading"> 
        <div class="lds-ring-container" v-if="loading" :disabled="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>Iniciar sesion</b-button>
      <b-button id="reset" type="reset" variant="danger" :disabled="loading">Reiniciar</b-button>
      
      <br><br>
    
      <p>¿No tienes cuenta?<router-link to="/"><button href="/" type="button" class="btn btn-link" >Registrate</button></router-link></p>
    </b-form>
  </div>
</template>


<script>
import axios from 'axios';
import { baseUrlLogin} from '../config/parameters';
export default {
  data() {
      return {
        imageSrc: './assets/img/icon.png',
        form: {
          email: '',
          password: '',
        },
        show: true,
        showAlert: false,
        textAlert: '',
        textOk: '',
        apiKey: '',
        id: '',
        loading: false
      }
    },
    methods: {
    onSubmit() {
      this.loading = true
        axios.post(baseUrlLogin, {
          email: this.form.emailUsername,
          password: this.form.password,
        },
        {
        headers: {
        'Content-Type': 'application/json',
        }
        })
        .then(response => {
          this.loading = false
          this.id = response.data['id']
          this.apiKey = response.data['apiKey']
          localStorage.setItem('id', this.id);
          localStorage.setItem('apikey', this.apiKey);
          this.showAlert = false
          this.$router.push('home')
        })
        .catch(error => {
          this.loading = false
          console.log(error)
          this.textAlert = error.response.data.error
          this.showAlert = true
        });
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.emailUsername = ''
        this.form.password = ''
        this.show = false
        this.showAlert = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    },
    
};
</script>

<style>
#contenedor2
{
    border: 1px solid #D3D3D3;
    background-color:  rgb(114, 204, 106);
    width: 300px;
    margin-top: 30px;
}
.texto-checkbox{
    font-size: 0.8em;
}
#sumbit{
  width:172px;
}
</style>
