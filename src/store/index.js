import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const userInfo = {
  username: '', //姓名
  nickName: '', //昵称
  sex: '', //性别
  avatarUrl: '', //头像
  mobile: '', //用户手机
  address: '', //地址
  hadSetPwd: '', //是否已修改密码
}
const state = {
  userInfo,
  floor: wx.getStorageSync('floor') || '0',
  userAuth: wx.getStorageSync('user_Auth') || 'cmPerson',
  openId: wx.getStorageSync('open_id') || '', //用户OPEN_ID
  loginToken: wx.getStorageSync('login_Token') || "", //token
  sessionKey:  wx.getStorageSync('session_Key') || "", //token
  wxAuthShow: false, //微信获取用户信息是否弹出权限按钮
  wxAuthPhoneShow:false // 获取微信手机号授权按钮
}
const mutations = {
  setInfo(state, value) {
    state.info = value
  },
  setFloor(state, value) {
    state.floor = value
  },
  setToken(state, value) {
    state.loginToken = value
  }
}
const actions = {

  setInfoAsync({
    commit
  }, value) {
    commit('setInfo', value)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
