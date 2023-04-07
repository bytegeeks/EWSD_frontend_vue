import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createApp(App)
    // .use(BootstrapVue)
    // .use(IconsPlugin)
    .use(store)
    .use(router)
    .mount("#app");
