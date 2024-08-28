import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';



const app = createApp(App);

app.use(router);  // Use the router
app.use(store);   // Use the store

app.mount('#app');  // Mount the app