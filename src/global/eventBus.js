import Vue from 'vue'
const EventBus = new Vue();

// Vue.prototype.$bus = EventBus;
Object.defineProperty(Vue.prototype, '$bus', {
  get: function () {
    return EventBus
  }
})
