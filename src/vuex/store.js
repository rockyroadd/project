import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'cscamp',
  storage: window.localStorage
})

export const store = new Vuex.Store({
  state: {
    user:{
      status: 'INVALID',
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      userType: ''
    },
  },
  mutations: {
    setUser(state, user){
      state.user.status = user.response_description;
      state.user.id = user.data.result[0].id;
      state.user.username = user.data.result[0].username;
      state.user.firstname = user.data.result[0].firstname;
      state.user.lastname = user.data.result[0].lastname;
      state.user.userType = user.data.result[0].userType;
    },
  },
  getters: {
    user:state=>state.user,
  },
  actions: {},
  plugins: [vuexPersist.plugin]
});