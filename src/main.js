import Vue from 'vue'
import App from './App.vue'

//css
import './assets/css/grid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')