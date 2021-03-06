import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueChartJs from "vue-chartjs";
import css from "@/assets/css/style.css";

Vue.use(VueChartJs);
Vue.config.productionTip = false;

new Vue({
  css,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
