import Storage from '../lib/Storage'
import Vue from 'vue'
let storage = new Storage();
storage.create('cmwifi');
// Vue.prototype.$storage = storage.getRepository.bind(storage);
Vue.prototype.$storage = storage.getRepository('cmwifi');

