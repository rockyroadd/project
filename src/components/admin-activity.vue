<template>
    <b-container>
        <h4><b-icon icon="file-earmark" font-scale="1.25"></b-icon> กิจกรรม | กิจกรรมที่เข้าร่วม</h4>
        <br>
        <div style="overflow-x: auto;">
          <b-table striped :items="items" :fields="fields" class="text-center" style="background: #fff;">
              <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
              </template>
              <template v-slot:cell(namelist)="activityId">
                  <router-link :to="{ name: 'activityvote', params: { id: activityId.item.namelist, name: activityId.item.activity }}" class="btn btn-secondary btn-sm">
                      รายชื่อ
                  </router-link>
              </template>
              <template v-slot:cell(request)="activityId">
                  <router-link :to="{ name: 'request', params: { id: activityId.item.namelist, name: activityId.item.activity} }" class="btn btn-warning btn-sm">
                      ขอใบรับรอง
                  </router-link>
              </template>
          </b-table>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

  export default {
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
            { key: 'index', label: 'ลำดับ' },
            { key: 'activity', label: 'ชื่อกิจกรรม' },
            { key: 'date', label: 'วัน/เดือน/ปี' },
            { key: 'namelist', label: 'โหวตผู้เข้าร่วม' },
            { key: 'request', label: 'ยื่นใบรับรอง' },
        ],
        items: []
      }
    },
    mounted: function(){
      axios.post('https://cscampproject.yuzudigital.com/getRegisActivityByUserId', {
        userId: this.$store.getters.user.id,
      })
      .then((response) => {
        if(response.data.response_description == 'SUCCESS'){
          for (var i = 0; i < response.data.data.result.length; i++){
            var obj = {};
            obj['activity'] = response.data.data.result[i].activityName;
            obj['date'] = moment(response.data.data.result[i].registerDate).format('DD MMMM YYYY, h:mm:ss a');
            obj['namelist'] = response.data.data.result[i].userActivityId;
            this.items.push(obj);
          }
        }
      }, (error) => {
        console.log(error);
      });
    },
    beforeCreate() {
      if ((this.$store.getters.user.userType != 'STUDENT') && (this.$store.getters.user.userType != 'AJ')){
        this.$router.replace({ path: "/" })
      }
    },
  }
</script>