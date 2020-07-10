<template>
  <div id="app">
    <div class="container-fluid h-100 px-0" style="overflow-x: hidden;">
      <navbar></navbar>
      <b-row class="m-0" style="height: 92.5%">
        <b-col md="2" class="p-0">
          <login v-if="$store.getters.user.status != 'SUCCESS'"></login>
          <user v-else></user>
        </b-col>
        <b-col md="10" class="py-4 px-5" style="background: rgb(234, 234, 234);">
          <router-view/>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar';
import login from '@/components/login';
import user from '@/components/user';
import { store } from '@/vuex/store';

export default {
  name: 'App',
  store,
  components:{
    navbar, login, user
  },
  methods:{
    alert(){
      this.$bvToast.toast('Toast body content', {
        title: `Login Success`,
        variant: variant,
        solid: true
      });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

html, body {
  height: 100%;
}
#app {
  font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  height: 100% !important;
}
</style>
