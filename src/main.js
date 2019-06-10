import Vue from 'vue';
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Registro from './components/Registro.vue'
import LogIn from './components/LogIn.vue'
import Home from './components/Home.vue'
import Authenticationfailed from './components/Authenticationfailed.vue'
import Profile from './components/Profile.vue'
import Verificacion from './components/Verificacion.vue'
import Verificar from './components/Verificar.vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
    
    { path: '/', component: Registro },
    { path: '/login', component: LogIn },
    { path: '/home', component: Home },
    { path: '/profile', component: Profile },
    { path: '/Authenticationfailed', component: Authenticationfailed },
    { path: '/Verificacion', component: Verificacion },
    { path: '/Verificar', component: Verificar },
    
    

]

const router = new VueRouter({
    routes // short for `routes: routes`
})


new Vue({
    el: '#app',
    router,
    render: h => h(App),
    
});