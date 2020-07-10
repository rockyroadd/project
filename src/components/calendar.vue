<template>
    <div>
        <h4>CALENDAR</h4>
        <p>กิจกรรมประจำเดือน</p>
        <FullCalendar
          defaultView="dayGridMonth"
          :plugins="calendarPlugins"
          @eventClick="handleDateClick"
          :events="this.event"
        />
        <b-modal ref="eventpopup" hide-footer :title="this.calendar.eventname">
          <div class="d-block text-center">
            <p>{{ this.calendar.eventdescription }}</p>
            <span v-if="$store.getters.user.userType != 'AJ'">
              <button v-if="this.myevent.includes(this.calendar.eventname)" class="btn btn-warning w-100 mt-3" disabled>ลงทะเบียนร่วมงาน</button>
              <button v-else class="btn btn-outline-warning w-100 mt-3" @click="regisActivity(calendar.eventname)">ลงทะเบียนร่วมงาน</button>
            </span>
          </div>
        </b-modal>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      calendar:{
        eventname: '',
        eventdescription: '',
        eventdate: '2020-02-01',
      },
      event:[
        {title: 'รับน้องภายในคณะ', date: '2020-06-15' , backgroundColor: 'yellow', description: 'เป็นกิจกรรมปิดบ้านภายในคณะที่ให้น้องๆปี 1 มานอนที่คณะเพื่อเป็นการสร้างทำความรู้จักกับเพื่อนๆในคณะและในแต่ละสาขา ทำให้สนิทสนมกันมากขึ้นโดยที่พี่ๆภายในคณะวิทยาศาสตร์จะดูแลในด้านต่างๆของน้องๆทั้งหมด'},
        {title: 'เน็ตเวิร์คเกมส์', start: '2020-02-08', end: '2020-02-10' , backgroundColor: 'yellow', description: 'เป็นกิจกรรมของ สาขาวิทยาการคอมพิวเตอร์ของแต่ละมอทั่วไปเทศแล้วแต่ว่า มหาวิทยาลัยจะส่งเข้ามาร่วมแข่งขัน ใน network game มีทั้งกีฬาและเกม ที่สำคัญมีด้านการแข่งของวิชาการอีกด้วยเพื่อเป็นการสร้างสัมพันธ์สาขาเดียวกันในแต่ละมหาวิทยาลัย' },
        {title: 'บายเนี่ย', date: '2020-04-19' , backgroundColor: 'yellow', description: 'เป็นกิจกรรมของน้องๆปี 1-3 ที่จะจัดงานให้กับพี่ปีที่ 4 เพื่อเป็นการสร้างสัมพันธ์กัน เพราะว่าพี่ปี 4 เป็นปีสุดท้ายที่จะอยู่ใน สถาบันของเราแล้วและเป็นธรรมเนียมที่ต้องมีทุกปีจะเป็นการที่รวมตัวของพี่ปี 4 อีกด้วย' },
        {title: 'งานแคแสด',  start: '2020-02-09', end: '2020-02-11', description: 'เป็นกิจกรรมกีฬาสีภายในแต่ละคณะเพื่อ เป็นการแข่งขันในด้าน กีฬาและเกม เป็นการสร้างสัมพันธ์ระหว่างคณะต่างๆภายในสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณลาดกระบัง' },
        {title: 'วิทยาวิทยา', date: '2020-10-21', description: 'เป็นกิจกรรมกีฬาสีภายในคณะวิทยาศาสตร์ แบ่งออกเป็น 7 สี ของแต่ละสาขาในทุกๆปี จะมีกิจกรรมนี้อยู่เพื่อเป็นการทำให้รู้จักมากขึ้นระหว่างสาขาต่างๆของคณะวิทยาศาสตร์ เพื่อเป็นการทำให้แต่ละสาขาสนิทกันมากขึ้น' },
        {title: 'แต้งพี่', date: '2020-04-22', description: 'เป็นกิจกรรมภายในคณะวิทยาศาสตร์ของน้องๆปี 1-3 ของทุกสาขาที่จะจัดงานให้กับพี่ปีที่ 4 ทุกสาขาเพื่อเป็นการสร้างสัมพันธ์กัน เพราะว่าพี่ปี 4 เป็นปีสุดท้ายที่จะอยู่ใน สถาบันของเราแล้วและเป็นธรรมเนียมที่ต้องมีทุกปีจะเป็นการที่รวมตัวของพี่ปี 4 ในทุกสาขาอีกด้วย' },
        {title: 'เปิดบ้าน', start: '2020-08-23', end: '2020-08-25', description: 'เป็นกิจกรรมของคณะที่จะมีรุ่นพี่ภายในคณะเข้ามาทำกิจกรรมให้กับน้องปี 1 ที่เข้ามาใหม่ทำให้รู้จักคณะวิทยาศาสตร์ของเรามากขึ้น' },
        {title: 'งานวันวิทยาศาสตร์', start: '2020-08-23', end: '2020-08-25', description: 'เป็นกิจกรรมที่ในแต่ละสาขาเอาด้านวิชาการของแต่ละสาขามาโชว์ให้กับน้องๆนักเรียนที่เข้ามาดูภายในคณะวิทยาศาสตร์เพื่อเป็นทำให้น้องนักเรียนสนใจในแต่ละสาขาของเราอีกด้วย' },
        {title: 'รับน้องภายในคณะ', date: '2021-08-02', description: 'เป็นกิจกรรมปิดบ้านภายในคณะที่ให้น้องๆปี 1 มานอนที่คณะเพื่อเป็นการสร้างทำความรู้จักกับเพื่อนๆในคณะและในแต่ละสาขา ทำให้สนิทสนมกันมากขึ้นโดยที่พี่ๆภายในคณะวิทยาศาสตร์จะดูแลในด้านต่างๆของน้องๆทั้งหมด' },
      ],
      myevent: []
    }
  },
  methods: {
    getData(){
      axios.post('https://cscampproject.yuzudigital.com/getRegisActivityByUserId', {
        userId: this.$store.getters.user.id,
      })
      .then((response) => {
        if(response.data.response_description == 'SUCCESS'){
          // console.log(response.data.data.result);
          // console.log(this.$store.getters.user.id);
          for (var i = 0; i < response.data.data.result.length; i++){
            this.myevent.push(response.data.data.result[i].activityName);
          }
          // console.log(this.myevent)
        }
      }, (error) => {
        console.log(error);
      });
    },
    regisActivity(eventname){
      axios.post('https://cscampproject.yuzudigital.com/regisActivity', {
          userId: this.$store.getters.user.id,
          activityName: this.calendar.eventname,
          activityDate: this.calendar.eventdate
        })
        .then((response) => {
          if(response.data.response_description == 'SUCCESS'){
            this.getData();
            this.$toast.open({
              message: "บันทึกข้อมูล",
              position: "top-right",
              type: "success",
              duration: 5000,
              dismissible: true
            });
          }
        }, (error) => {
          console.log(error);
        });
    },
    handleDateClick(info) {
      // console.log(info.event.start)
      this.calendar.eventname = info.event.title;
      // this.calendar.eventdate = info.event.date;
      this.calendar.eventdescription = info.event.extendedProps.description;
      this.$refs['eventpopup'].show();
    }
  },
  mounted: function(){
    this.getData();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
@import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css';

*{
  font-family: 'Kanit', sans-serif;
}
</style>