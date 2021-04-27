<template>
  <q-page class="q-pa-md">
    <!-- SEARCH TASK  -->
    <div class="row q-mb-lg">
      <search></search>
    </div>
    <!-- SEARCH  -->
    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"> No search results.</p>
    <!-- NO TASK TO DO  -->
    <no-tasks v-if="!Object.keys(tasksTodo).length && !search"></no-tasks>

    <!-- TODO TASKS  -->
    <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />

    <!-- COMPLETED TASKS  -->
    <tasks-completed
      :tasksCompleted="tasksCompleted"
      v-if="Object.keys(tasksCompleted).length"
    />

    <!-- ADD BUTTON  -->
    <div class="absolute-button text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true"
      />
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
    search: require("components/Tasks/Tools/Search.vue").default,
  },
};
</script>

<style lang="stylus" scoped></style>
