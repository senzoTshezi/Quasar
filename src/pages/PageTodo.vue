<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
        <!-- SEARCH TASK  -->
        <div class="row q-mb-lg">
          <search></search>
          <sort/>
        </div>
        <!-- SEARCH  -->
        <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"> No search results.</p>
        
        <!-- DIV THAT WRAP UP NOTASK, TASKS AND COMPLETED  -->
        <q-scroll-area class="q-scroll-area-tasks">
            <!-- NO TASK TO DO  -->
            <no-tasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-tasks>

            <!-- TODO TASKS  -->
            <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />

            <!-- COMPLETED TASKS  -->
            <tasks-completed
              :tasksCompleted="tasksCompleted"
              v-if="Object.keys(tasksCompleted).length"
            />
        </q-scroll-area >  

        <!-- ADD BUTTON  -->
        <!-- no-pointer-event class will make the component to be clickable even though they are bedind this Div  -->
        <div class="absolute-button text-center q-mb-lg no-pointer-event">
          <q-btn
            round
            color="primary"
            size="24px"
            icon="add"
            @click="showAddTask = true"
          />
        </div>
    </div>
    <!-- ADD FORM  -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
    
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddTask: false,
    };
  },
  // To get data from the state we created we will first create a computed property
  computed: {
    // we can also use a more clean way that is MapGetter
    // First we need to specify the module that we are getting from ('tasks') then we list all of the getters that we want to get ['tasks']
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapGetters("settings", ["settings"]),
    ...mapState('tasks',['search'])
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "search": require("components/Tasks/Tools/Search.vue").default,
    "sort": require("components/Tasks/Tools/Sort.vue").default


  },
};
</script>

<style lang="stylus" scoped>
  .q-scroll-area-tasks{
    display: flex;
    flex-grow:1
  }
</style>
