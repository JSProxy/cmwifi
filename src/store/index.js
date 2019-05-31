import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const userInfo = {
  username: '',       //姓名
  nickName: '',       //昵称
  sex: '',            //性别
  avatarUrl:'',      //头像
  mobile: '',         //用户手机
  address: '',        //地址
  hadSetPwd: '',      //是否已修改密码
}
const state = {
  userInfo,
  userAuth: getCookie('userAuth') || 'cmPerson',
  openId: getCookie('open_id') || '',                   //用户OPEN_ID
  userToken: getCookie('userToken') || "",              //token
  wxAuthShow: false                                     //微信获取用户信息是否弹出权限按钮
}
const mutations = {
  setInfo(state ,value){
    state.info = value
  }
}
const actions = {
  
  setInfoAsync({commit},value){
    commit('setInfo',value)
  }
}
const store = new Vuex({
  state,
  mutations,
  actions
})
export default store