import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vue2Editor from "vue2-editor";

createApp(App).use(store).use(router).mount("#app");
