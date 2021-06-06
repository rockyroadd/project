<template>
  <b-container-fluid>
    <div class="p-4 mb-3" style="background: #ffbf0085;">
        <b-row>
            <b-col md="3" class="pl-2 pr-0">
                <b-icon icon="person-circle" style="width: 100%;" ></b-icon>
            </b-col>
            <b-col md="9" class="px-2" v-if="$store.getters.user.userType == 'STUDENT'">
                <b>{{ $store.getters.user.username }}</b>
                <br>
                <span>{{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}</span>
                <!-- <br>
                <span>ภาค วิชาวิทยาการคอมพิวเตอร์</span>
                <br>
                <span> นักศึกษาปีที่ 4</span> -->
            </b-col>
            <b-col md="9" class="px-2" v-if="$store.getters.user.userType == 'AJ'">
                <b>TEACHER</b>
                <br>
                <b>{{ $store.getters.user.username }}</b>
                <br>
                <span>{{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}</span>
            </b-col>
        </b-row>
    </div>
    <div class="mt-2 p-4">
        <h5 class="text-center"><b>เมนู</b></h5>
        <br>
        <b-nav vertical style="color: #000 !important;">
          <b-nav-item active href="../"><b-icon icon="house-door-fill" font-scale="1.3"></b-icon> หน้าหลัก</b-nav-item>
          <span v-if="$store.getters.user.userType == 'STUDENT'">
            <b-nav-item href="/activity"><b-icon icon="file-earmark" font-scale="1.3"></b-icon> กิจกรรม</b-nav-item>
            <b-nav-item href="/printed"><b-icon icon="lightning-fill" font-scale="1.3"></b-icon> พิมพ์ใบรับรอง</b-nav-item>
          </span>
          <span v-if="$store.getters.user.userType == 'AJ'">
            <b-nav-item href="/approve"><b-icon icon="clock-history" font-scale="1.3"></b-icon> อนุมัติใบรับรอง</b-nav-item>
            <b-nav-item href="/admin-activity"><b-icon icon="file-earmark" font-scale="1.3"></b-icon> กิจกรรม</b-nav-item>
          </span>
          <b-nav-item @click="userLogout"><b-icon icon="box-arrow-in-right" font-scale="1.3"></b-icon> ออกจากระบบ</b-nav-item>
          <!-- <button class="btn btn-outline-dark" @click="userLogout">Logout</button> -->
        </b-nav> 
    </div>
  </b-container-fluid>
</template>

<script>
export default {
  methods: {
    userLogout: function() {
      this.$toast.open({
        message: "ออกจากระบบสำเร็จ",
        position: "top-right",
        type: "success",
        duration: 5000,
        dismissible: true
      });
      localStorage.removeItem("cscamp");
      location.reload();
      this.$router.push('calendar');
    },
  }
};
</script>

<style scoped>

a{
  color: #000 !important;
}

</style>
