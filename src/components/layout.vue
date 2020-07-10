<template>
  <b-container-fluid style="overflow-x: hidden;">
    <b-row class="m-0">
      <b-col md="3" class="p-0">
        <login v-if="user.status != 'login'"></login>
        <user v-if="user.status == 'login'"></user>
      </b-col>
      <b-col md="9" class="py-4 px-5" style="background: rgb(216, 216, 216);">
        <router-view/>
      </b-col>
    </b-row>
  </b-container-fluid>
</template>

<script>
import login from '@/components/login';
import user from '@/components/user';
import calendar from '@/components/calendar';
import activity from '@/components/activity';

export default {
  components: {
    login, user, calendar, activity
  },
  data() {
    return {
      user: {
        status: 'null',
        // status: 'login',
      },
      form: {
        username: "",
        password: ""
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
  }
};
</script>