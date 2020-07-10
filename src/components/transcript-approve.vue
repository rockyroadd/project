<template>
    <div class="my-4" v-if="$store.getters.user.status == 'SUCCESS'">
        <h4><b-icon icon="clock-history" font-scale="1.25"></b-icon> อนุมัติใบรับรอง</h4>
        <br> 
        <b-table striped :items="items" :fields="fields" class="text-center" style="background: #fff;">
            <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template v-slot:cell(approve)="data">
                <button class="btn btn-success btn-sm" @click="approve(data.item.approveId, data.item.userActivityId)">อนุมัติ</button>
            </template>
            <template v-slot:cell(reject)="data">
                <button class="btn btn-danger btn-sm" @click="reject(data.item.approveId, data.item.userActivityId)">ปฏิเสธ</button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [ 
            { key: 'index', label: 'ลำดับ' },
            { key: 'name', label: 'รายชื่อ' },
            { key: 'activity', label: 'กิจกรรม' },
            { key: 'date', label: 'วัน/เดือน/ปี' },
            { key: 'status', label: 'สถานะ' },
            { key: 'people', label: 'จำนวนคนเข้าร่วม' },
            { key: 'result', label: 'ผลการโหวต' },
            { key: 'approve', label: 'อนุมัติ' },
            { key: 'reject', label: 'ปฏิเสธ' },
          ],
        items: []
      }
    },
    methods:{
      getData: function(){
        axios.post('https://cscampproject.yuzudigital.com/approveList')
        .then((response) => {
          if(response.data.response_description == 'SUCCESS'){
            var resItems = [];
            for (var i = 0; i < response.data.data.result.length; i++){
              if(response.data.data.result[i].approveFlg == '0'){
                var obj = {};
                obj['name'] = response.data.data.result[i].firstname + ' ' + response.data.data.result[i].lastname;
                obj['activity'] = response.data.data.result[i].activityName;
                obj['date'] = response.data.data.result[i].registerDate;
                obj['status'] = response.data.data.result[i].status;
                obj['people'] = response.data.data.result[i].userActivityId;
                obj['result'] = response.data.data.result[i].voteCount;
                obj['userId'] = response.data.data.result[i].userId;
                obj['userActivityId'] = response.data.data.result[i].userActivityId;
                obj['major'] = response.data.data.result[i].major;
                obj['faculty'] = response.data.data.result[i].faculty;
                obj['approveId'] = response.data.data.result[i].approveId;
                obj['approveFlg'] = response.data.data.result[i].approveFlg;
                resItems.push(obj);
              }
              this.items = resItems;
            }
          }
        }, (error) => {
          console.log(error);
        });
      },
      approve: function(approveId, userActivityId){
        axios.post('https://cscampproject.yuzudigital.com/approveRequest', {
          approveId : approveId,
          approveFlg : '1',
          userActivityId : userActivityId
        })
        .then((response) => {
          if(response.data.response_description == 'SUCCESS'){
            this.$toast.open({
              message: "อนุมัติสำเร็จ",
              position: "top-right",
              type: "success",
              duration: 5000,
              dismissible: true
            });
            this.getData();
          }
          }, (error) => {
            console.log(error);
          });
      },
      reject: function(approveId, userActivityId){
        axios.post('https://cscampproject.yuzudigital.com/approveRequest', {
          approveId : approveId,
          approveFlg : '2',
          userActivityId : userActivityId
        })
        .then((response) => {
          if(response.data.response_description == 'SUCCESS'){
            this.$toast.open({
              message: "ปฏิเสธสำเร็จ",
              position: "top-right",
              type: "error",
              duration: 5000,
              dismissible: true
            });
            this.getData();
          }
          }, (error) => {
            console.log(error);
          });
      }
    },
    mounted: function(){
      this.getData();
    },
    beforeCreate() {
      if (this.$store.getters.user.userType != 'AJ') {
        this.$router.replace({ path: "/" })
      }
    },
  }
</script>