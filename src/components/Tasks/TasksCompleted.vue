<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div :class="{ 'q-mt-lg' : !settings.showTasksInOneList }">
      <list-header v-if="!settings.showTasksInOneList" bgColor="bg-green-4">Task Completed</list-header>
      <q-list  bordered separator>
        <task
          v-ripple
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ["tasksCompleted"],
  computed:{
    ...mapGetters('settings', ['settings'])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Share/ListHeader.vue").default,
  },
};
</script>

<style>
</style>