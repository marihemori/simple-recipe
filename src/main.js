import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";

import "./assets/styles/style.css";

createApp(App)
  .use(store)
  .use(router)
  .use(plugin, defaultConfig(config))
  .mount("#app");
