import Vue from 'vue'
import Router from 'vue-router'
import calendar from '@/components/calendar'
import activity from '@/components/activity'
import activityvote from '@/components/activity-vote'
import transcriptrequest from '@/components/transcript-request'
import printed from '@/components/transcript-printed'
import approve from '@/components/transcript-approve'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: calendar
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/activity/:id',
      name: 'activityvote',
      component: activityvote,
      props: true
    },
    {
      path: '/activity/:id/request',
      name: 'request',
      component: transcriptrequest,
      props: true
    },
    {
      path: '/printed',
      name: 'printed',
      component: printed,
    },
    {
      path: '/approve',
      name: 'approve',
      component: approve,
    },
  ]
})
