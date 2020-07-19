import Vue from "vue";
import App from "./App.vue";

import "./style.less";

Vue.config.productionTip = false;

console.log(1, 2, 3);
//fwew rwwgw
//  wrwrw wrwr w
// console.log(b);    // b未声明   eslint校验不过

new Vue({
  render: (h) => h(App),
}).$mount("#app");
