<template>
<div id="main">
  <div id="contenedor" class="container">
    <img v-bind:src="imageSrc" class="d-inline-block align-top icon" alt="Kitten">
    
    <p>Registrate y escucha musica sin limites.</p>
    <p>------------------o------------------</p>
    <b-alert class="alertDanger" :show="showAlert" variant="danger">{{ textAlert }}</b-alert>
  <b-alert class="alertSucces" :show="showSucces" variant="success">{{ textOk }}</b-alert>
    <b-form v-on:submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Direccion de correo electronico:"
        label-for="input-1"
        >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Nombre de usuario:"
        label-for="input-2"
        >
        <b-form-input
          id="input-2"
          v-model="form.username"
          required
          placeholder="Nombre de usuario"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Nombre:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.name"
          required
          placeholder="Nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Apellido:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.surname"
          required
          placeholder="Apellido"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5">
        <b-form-input
          type="password"
          id="input-5"
          v-model="form.password"
          required
          placeholder="Contraseña"
        ></b-form-input>
      </b-form-group>

      <b-button id="sumbit" type="submit" variant="primary" :disabled="loading">
        <div class="lds-ring-container" v-if="loading" :disabled="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        Siguiente</b-button>
      <b-button id="reset" type="reset" variant="danger" :disabled="loading">Reiniciar</b-button>
      <br><br>
      <p>¿Ya tienes cuenta?<router-link to="/login" ><button id="login" type="button" class="btn btn-link">Inicia sesion</button></router-link></p>
    </b-form>
  </div>
  <div id="div_image">
      <img id="image_devices" v-bind:src="image2Src"  class="image" alt="Kitten">
  </div>
  </div>
</template>


<script>
import axios from 'axios';
import { baseUrl} from '../config/parameters';
export default {
  data() {
      return {
        imageSrc: './assets/img/icon.png',
        image2Src: './assets/img/devices.png',
        form: {
          email: '',
          username: '',
          name: '',
          surname: '',
          password: '',
        },
        show: true,
        showAlert: false,
        showSucces: false,
        textAlert: '',
        textOk: '',
        loading: false
      }
    },
    created(){

    },
    methods: {
      delete() {
        this.form.email = ''
        this.form.username = ''
        this.form.name = ''
        this.form.surname = ''
        this.form.password = ''
      },
      onSubmit() {
        this.loading = true
        axios.post(baseUrl, {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          surname: this.form.surname
        })
        .then(response => {
          this.loading = false
          console.log(response);
          this.textOk = response['data']
          this.showSucces = true
          this.showAlert = false
          this.delete()
        })
        .catch(error => {
          this.loading = false
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
          this.showSucces = false 
          this.showAlert = true
        });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.delete()
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>

<style>
#main{
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
 
  

  }
#contenedor
{
    border: 1px solid #D3D3D3;
    width: 300px;
    margin-top: 30px;
    background-color: rgb(114, 204, 106);
}
.alertDanger,.alertSucces{
    margin: 15px;
}
.icon{
    width: 270px;
    padding: 12%;             
    background: transparent;
}
#div_image{
  margin-top: 300px;
  width:800px;
}
#image_devices{
  width: 100%;
}
@media screen and (max-width:1300px) {
#div_image{
  display:none
}
}
p{
  text-align: center;
  color: gray;
  size: 15px
}
</style>
