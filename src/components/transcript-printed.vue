<template>
    <div>
        <h4><b-icon icon="lightning-fill" font-scale="1.25"></b-icon> พิมพ์ใบรับรอง</h4>
        <br>
        <b-table striped :items="items" :fields="fields" class="text-center" style="background: #fff;">
            <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template v-slot:cell(status)="data">
                <div v-if="data.item.status == '0'">
                    <span class="printwaiting"></span> <span>ยังไม่ยื่นขอใบรับรอง/รอตรวจสอบ</span>
                </div>
                <div v-if="data.item.status == '1'">
                    <span class="printsuccess"></span> <span>อนุมัติ</span>
                </div>
                <div v-if="data.item.status == '2'">
                    <span class="printreject"></span> <span>ไม่อนุมัติ</span>
                </div>
            </template>
            <template v-slot:cell(printed)="data">
                <!-- <b-icon icon="arrow-counterclockwise" animation="spin-reverse" font-scale="1.3"></b-icon> พิมพ์ใบรับรอง -->
                <button v-if="data.item.status == 1" @click="certprint" class="btn btn-warning btn-sm">พิมพ์ใบรับรอง</button>
                <button v-else class="btn btn-warning btn-sm" disabled>พิมพ์ใบรับรอง</button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Sarabun: {
    normal: 'Sarabun-Regular.ttf',
    bold: 'Sarabun-Bold.ttf',
    italics: 'Sarabun-Italic.ttf',
    bolditalics: 'Sarabun-BoldItalic.ttf'
  }
}

  export default {
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
            { key: 'index', label: 'ลำดับ' },
            { key: 'activity', label: 'ชื่อกิจกรรม' },
            { key: 'date', label: 'วัน/เดือน/ปี' },
            { key: 'status', label: 'สถานะใบรับรอง' },
            { key: 'printed', label: 'พิมพ์ใบรับรอง' },
        ],
        items: [],
        docDefinition: {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            content: [
                {text: 'CERTIFICATE OF ACHIEVEMENT', style: 'header', margin: [ 0, 70, 0, 15 ]},
                {text: 'We officialy present', style: 'subheader', margin: [ 0, 0, 0, 0 ]},
                {text: '', style: 'name', margin: [ 0, 30, 0, 30 ]},
                {text: 'with this award, for Participated', style: 'subheader', margin: [ 0, 0, 0, 0 ]},
                {text: 'in cs camp activities', style: 'subheader', margin: [ 0, 0, 0, 0 ]},
                {text: '_____________________________', style: 'line', margin: [ 0, 80, 0, 0 ]},
                {text: 'KRIDSADA BUDSARA', style: 'certby', margin: [ 0, 12, 0, 0 ]},
                {text: 'Head of', style: 'certby2', margin: [ 0, 12, 0, 0 ]},
                {text: 'Computer Science', style: 'certby2', margin: [ 0, 2, 0, 0 ]},
                {text: 'Department', style: 'certby2', margin: [ 0, 2, 0, 0 ]},
            ],
            defaultStyle: {
              font: 'Sarabun'
            },
            styles: {
                header: {
                    fontSize: 30,
                    bold: true,
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 16,
                    //   italics: true,
                    alignment: 'center'
                },
                name: {
                    fontSize: 30,
                    color: 'red',
                    bold: true,
                    alignment: 'center'
                },
                line: {
                    fontSize: 16,
                    color: 'red',
                    bold: true,
                    alignment: 'center'
                },
                certby: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center'
                },
                certby2: {
                    fontSize: 14,
                    alignment: 'center'
                }
            }
        },
      }
    },
    methods:{
        certprint: function(){
            console.log("Printed");
            // pdfMake.createPdf(this.docDefinition).download();
            pdfMake.createPdf(this.docDefinition).download('cscamp-cert.pdf');
        }
    },
    mounted: function(){
      axios.post('https://cscampproject.yuzudigital.com/getRegisActivityByUserId', {
        userId: this.$store.getters.user.id,
      })
      .then((response) => {
        if(response.data.response_description == 'SUCCESS'){
          this.docDefinition.content[2].text = this.$store.getters.user.firstname + ' ' + this.$store.getters.user.lastname;
          for (var i = 0; i < response.data.data.result.length; i++){
            var obj = {};
            obj['activity'] = response.data.data.result[i].activityName;
            obj['date'] = response.data.data.result[i].registerDate;
            obj['status'] = response.data.data.result[i].approveFlg;
            this.items.push(obj);
          }
        }
      }, (error) => {
        console.log(error);
      });
    },
    beforeCreate() {
      if (this.$store.getters.user.userType != 'STUDENT') {
        this.$router.replace({ path: "/" })
      }
    },
  }
</script>

<style>
.printwaiting{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: rgb(255, 238, 0);
    border-radius: 50%;
    box-shadow: 0px 0px 5px 2px rgba(255, 238, 0, 0.322);
    margin-right: 5px;
}
.printsuccess{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: rgb(0, 255, 55);
    border-radius: 50%;
    box-shadow: 0px 0px 5px 2px rgba(0, 255, 55, 0.322);
    margin-right: 5px;
}
.printreject{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: rgb(255, 0, 0);
    border-radius: 50%;
    box-shadow: 0px 0px 5px 2px rgba(255, 0, 0, 0.322);
    margin-right: 5px;
}
</style>