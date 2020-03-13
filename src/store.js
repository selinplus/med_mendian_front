import Vue from 'vue'
import Vuex from 'vuex'
import db from './utils/localstorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: db.get('token'),
    username: db.get('username'),
    mc: db.get('mc'),
    mendianID : db.get('mendianID')
  },
  mutations: {
    setToken(state, val) {
      db.save('token', val)
      state.token = val
    },
    setMendianID(state, val) {
      db.save('mendianID', val)
      state.mendianID = val
    },    
    setUsername(state, val) {
      db.save('username', val)
      state.username = val
    },    
    getUsername(state) {
      return state.username
    },
    setMc(state, val) {
      db.save('mc', val)
      state.mc = val
    },      
    getMc(state) {
      return state.mc
    },
    getMendianID(state) {
      return state.mendianID
    },
  },
  actions: {

  }
})
