// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Vant from "vant";
import lodash from "lodash";
import store from "./store/index";
import Vuex from "vuex";
Vue.use(Vuex);
// 组件
import mycard from "./components/recoCard.vue";
import collCard from "./components/collectionCard.vue";
Vue.component("collcard", collCard);
Vue.component("mycard", mycard);
import "vant/lib/index.css";
import { Lazyload } from "vant";
import VueAwesomeSwiper from "vue-awesome-swiper";

import "swiper/dist/css/swiper.css";
import load from "./components/load.vue";
// glide

Vue.component(load);
Vue.use(VueAwesomeSwiper /* { default global options } */ );
Vue.use(Vant);
// Vue.use(dayjs);
Vue.use(Lazyload);
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://musicapi.citrons.cn";
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$http = axios;
Vue.prototype.$lodash = lodash;
Vue.use(axios);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>",
    render: h => h(App)
});