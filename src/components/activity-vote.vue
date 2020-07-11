<template>
  <div class="my-4">
    <h4>
      <b-icon icon="file-earmark" font-scale="1.25"></b-icon> กิจกรรม |
      กิจกรรมที่เข้าร่วม
    </h4>
    <br />
    <h5>กิจกรรม : {{ $route.params.name }}</h5>
    <b-table
      striped
      :items="items"
      :fields="fields"
      class="text-center"
      style="background: #fff;"
    >
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(vote)="voted">
        <button v-if="voted.item.username == $store.getters.user.username" class="btn btn-warning btn-sm" disabled>โหวต</button>
        <button
          v-else
          @click="voteName(voted.item.userActivityId)"
          class="btn btn-warning btn-sm"
        >
          โหวต
        </button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        { key: "index", label: "ลำดับ" },
        { key: "name", label: "รายชื่อ" },
        { key: "date", label: "วัน/เดือน/ปี" },
        { key: "status", label: "สถานะกิจกรรม" },
        { key: "vote", label: "โหวตผู้เข้าร่วม" }
      ],
      items: []
    };
  },
  methods: {
    voteName: function(userActivityId) {
      console.log("VOTE NAME" + userActivityId + userActivityId + this.$store.getters.user.id);
      axios.post(
          'https://cscampproject.yuzudigital.com/voteUserByUserActivityId',
          {
            userActivityId: userActivityId,
            userId: this.$store.getters.user.id
          }
        )
        .then(
          (response) => {
            if (response.data.response_code == "0001") {
              this.$toast.open({
                message: response.data.response_description,
                position: "top-right",
                type: "error",
                duration: 5000,
                dismissible: true
              });
            } else {
              this.$toast.open({
                message: response.data.response_description,
                position: "top-right",
                type: "success",
                duration: 5000,
                dismissible: true
              });
            }
          },
          (error) => {
            console.log("error");
          }
        );
    }
  },
  mounted: function() {
    axios
      .post("https://cscampproject.yuzudigital.com/getUserByActivityName", {
        activityName: this.$route.params.name
      })
      .then(
        response => {
          if (response.data.response_description == "SUCCESS") {
            for (var i = 0; i < response.data.data.result.length; i++) {
              var obj = {};
              obj["name"] =
                response.data.data.result[i].firstname +
                " " +
                response.data.data.result[i].lastname;
              obj["date"] = response.data.data.result[i].registerDate;
              obj["status"] = response.data.data.isSucceed;
              obj["username"] = response.data.data.result[i].username;
              obj["userActivityId"] = response.data.data.result[i].userActivityId;

              this.items.push(obj);
            }
            console.log(this.items)
          }
        },
        error => {
          console.log(error);
        }
      );
  },
  beforeCreate() {
      if (this.$store.getters.user.userType != 'STUDENT') {
        this.$router.replace({ path: "/" })
      }
  },
};
</script>
