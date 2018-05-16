import Toasts from './Toast.vue'

const Toast = {
  install: function(Vue){
    Vue.component('Toast', Toasts);
  }
}

export default Toast;
