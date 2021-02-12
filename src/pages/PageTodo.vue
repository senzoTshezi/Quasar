<template>
  <q-page class="q-pa-md">
    <q-list v-if="Object.keys(tasks).length" bordered  separator>

      <task v-ripple v-for="(task, key) in tasks" :key="key" :task="task" :id="key"></task>
      <!-- (task, key) key is the object name  -->
      

    </q-list>
    <br>

    <!-- ADD BUTTON  -->
    <div class="absolute-button text-center q-mb-lg">
      <q-btn round color="primary" size="24px" icon="add" @click="showAddTask = true " />
    </div>

    <!-- ADD FORM  -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"/>
    </q-dialog>

  </q-page>
</template>

<script>
import Task from 'src/components/Tasks/Task.vue'
import { mapGetters } from 'vuex'
import AddTask from 'src/components/Tasks/Modals/AddTask.vue'
export default {


  data() {
    return {
      showAddTask : false 
    }
  },
  // To get data from the state we created we will first create a computed property 
  computed : {

    // we can also use a more clean way that is MapGetter 
    // First we need to specify the module that we are getting from ('tasks') then we list all of the getters that we want to get ['tasks']
    ...mapGetters( 'tasks',['tasks'])
    // tasks() {
    //   // On the store Module we will grep task that contains Tasks
    //   return this.$store.getters['tasks/tasks']
    // }
  },
  components : {
    'task' : require('components/Tasks/Task.vue').default,
    'add-task' : require('components/Tasks/Modals/AddTask.vue').default
  }


  // data() {
  //   return {
  //     tasks : [
  //       {
  //         id : 1,
  //         name : "Buy Calves",
  //         target: 50,
  //         current: 20,
  //         dueDate: '2021/12/01',
  //         dueTime: "12:00",
  //         completed : false
  //       },
  //       {
  //         id : 2,
  //         name : "Buy Pigs",
  //         target: 100,
  //         current: 0,
  //         dueDate: '2021/12/01',
  //         dueTime: "12:00",
  //         completed : false
  //       }
  //     ]
  //   }
  // }
}
</script>

<style lang="stylus" scoped>

</style>
