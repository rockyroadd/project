<template>
  <b-container class="py-4 px-4">
    <h4 class="mb-3">ลงชื่อเข้าใช้</h4>
    <!-- <pre>{{$store.getters.user}}</pre> -->
    <!--  -->
    <b-form @submit.prevent="authUser">
      <b-form-group id="input-group-1" label="ชื่อผู้ใช้:" label-for="username">
        <b-form-input
          id="username"
          v-model="form.username"
          type="text"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group  id="input-group-2" label="รหัสผ่าน:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
// import { store } from '@/vuex/store'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
    };
  },
  methods: {
    authUser(){
        axios.post('https://cscampproject.yuzudigital.com/login', {
          username: this.form.username,
          password: this.form.password
        })
        .then((response) => {
          if(response.data.response_description == 'SUCCESS'){
            this.$store.commit('setUser', response.data);
            this.$toast.open({
              message: "เข้าสู่ระบบสำเร็จ",
              position: "top-right",
              type: "success",
              duration: 5000,
              dismissible: true
            });
          }
          else{
            this.$toast.open({
              message: "ชื่อ/รหัสผ่าน ไม่ถูกต้อง",
              position: "top-right",
              type: "error",
              duration: 5000,
              dismissible: true
            });
            this.form.username = "";
            this.form.password = "";
          }
          // console.log(response);
        }, (error) => {
          // console.log(error);
          this.$toast.open({
              message: "ชื่อ/รหัสผ่าน ไม่ถูกต้อง",
              position: "top-right",
              type: "error",
              duration: 5000,
              dismissible: true
          });
          this.form.username = "";
          this.form.password = "";
        });
    },
  }
};
</script>
