<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <!-- HEADER  -->
      <q-item-label header>Settings</q-item-label>


      <!-- BODY SECTION Time format  -->
      <q-item tag="label" v-ripple>
        <!-- LABEL  -->
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <!-- BUTTON  TOGGLE -->
        <q-item-section side>
          <q-toggle color="blue"  v-model="show12HourTimeFormat"/>
        </q-item-section>
      </q-item>

      <!-- BODY SECTION Show tasks in One List -->
      <q-item tag="label" v-ripple>
        <!-- LABEL  -->
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <!-- BUTTON  TOGGLE -->
        <q-item-section side>
          <q-toggle color="blue"  v-model="showTasksInOneList"/>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- ADD HELP PAGE  -->
    <q-list bordered padding>

      <q-item-label header>More</q-item-label>
      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
          <q-icon name="chevron_right"/>
      </q-item>

      <!-- VISIT OUR WEBSITE  -->
      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
          <q-icon name="chevron_right"/>
      </q-item>

      <!-- EMAIL US  -->
      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
          <q-icon name="chevron_right"/>
      </q-item>

    </q-list>

  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { openURL} from 'quasar'
export default {
// By import {mapGetters} from 'vuex' and ...mapGetters('settings',['settings'])
// store-settings.js is now vailable in this page 
  computed: {
    ...mapGetters('settings',['settings']),
    show12HourTimeFormat :{
      get (){
        return this.settings.show12HourTimeFormat
      },
      set (value){
        //trigger an action
        this.setShow12HourTimeFormat(value)
      }
    },
    // SHOW TASL IN ONE LIST 
    showTasksInOneList :{
      get (){
        return this.settings.showTasksInOneList
      },
      set (value){
        //trigger an action
        this.setShowTasksInOneList(value)
      }
    },

  },
  methods:{
    ...mapActions('settings', ['setShow12HourTimeFormat', 'setShowTasksInOneList']),
    visitOurWebsite (){
      openURL('https://fortemfarm.com/')
    },
    emailUs(){
      window.location.href ='mailto:senzo@fortemfarm.com?subject=I need help'
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>
