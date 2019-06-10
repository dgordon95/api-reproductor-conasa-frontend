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
          
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>
       <b-button id="sumbit" type="submit" variant="primary" :disabled="loading">
        <div class="lds-ring-container" v-if="loading" :disabled="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        Siguiente</b-button>
      <b-button id="reset" type="reset" variant="danger" :disabled="loading">Reiniciar</b-button>
</b-form>
    </div>
</template>
<script>
export default {
  
  data() {
    return {
     
    };
  },
  components: {
    
  },
  methods: {
   onSubmit() {
       
   }
  }
};
</script>
    
<style>

</style>