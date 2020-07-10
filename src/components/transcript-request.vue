<template>
  <div class="my-4">
    <h4>
      <b-icon icon="file-earmark" font-scale="1.25"></b-icon> กิจกรรม | ขอใบรับรอง
    </h4>
    <br>
    <b-jumbotron>
    <h5>กิจกรรม : {{ this.$route.params.name }}</h5>
    <br>
    <b-form @submit.prevent="requestTranscript">
      <b-form-group
        id="name-group"
        label="ผู้เข้าร่วม"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="request.name"
          type="text"
          required
          placeholder="ชื่อ-สกุล"
          disabled=""
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="faculty-group"
        label="คณะ"
        label-for="faculty"
      >
        <b-form-input
          id="faculty"
          v-model="request.faculty"
          type="text"
          required
          placeholder="คณะ"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="major-group"
        label="สาขา"
        label-for="major"
      >
        <b-form-input
          id="major"
          v-model="request.major"
          type="text"
          required
          placeholder="สาขา"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">ส่งคำขอ</b-button>
      <a href="../../activity" class="btn btn-secondary">กลับ</a>
    </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      request: {
        name: this.$store.getters.user.firstname + ' ' + this.$store.getters.user.lastname,
        major: "",
        faculty: ""
      }
    };
  },
  methods:{
    requestTranscript(){
      console.log(this.request.major)

      axios.post("https://cscampproject.yuzudigital.com/requestApprove", {
        userId: this.$store.getters.user.id,
        userActivityId: this.$route.params.id,
        name: this.request.name,
        major: this.request.major,
        faculty: this.request.faculty
      })
      .then((response) => {
        if(response.data.response_description == 'SUCCESS'){
          this.$router.push({ name: "calendar"});
        }
      }, (error) => {
        console.log(error);
      });
    }
  },
  beforeCreate() {
      if (this.$store.getters.user.userType != 'STUDENT') {
        this.$router.replace({ path: "/" })
      }
  },
};
</script>
