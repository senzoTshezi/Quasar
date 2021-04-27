<template>
  <q-page class="q-pa-md">
    <!-- SEARCH TASK  -->
    <div class="row q-mb-lg">
      <search></search>
    </div>

    <!-- NO TASK TO DO  -->
    <no-tasks v-if="!Object.keys(tasksTodo).length"></no-tasks>

    <!-- TODO TASKS  -->
    <tasks-todo :tasksTodo="tasksTodo" v-else />

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
import Task from "src/components/Tasks/Task.vue";
import { mapGetters } from "vuex";
import AddTask from "src/components/Tasks/Modals/AddTask.vue";
import NoTasks from "components/Tasks/NoTasks.vue";
import Search from "components/Tasks/Tools/Search.vue";
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
