<template>
  <div id="app">
      <Navbar/>
    {{ message }}
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  data() {
    return {
      message: 'Hello World',
    };
  },
  components: {
    'Navbar': Navbar,
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>