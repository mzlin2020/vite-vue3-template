import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import "@/assets/font/iconfont.css";
import "@/assets/styles/base.less";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
