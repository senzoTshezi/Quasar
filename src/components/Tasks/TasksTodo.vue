<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
    <div>
      <list-header v-if="!settings.showTasksInOneList" bgColor="bg-orange-4">Task Todo </list-header>
      <q-list  bordered separator>
        <task
          v-ripple
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        ></task>
        <!-- (task, key) key is the object name  -->
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ["tasksTodo",],
  computed:{
    ...mapGetters('settings', ['settings'])
  },
  components: {
    'task': require("components/Tasks/Task.vue").default,
    'list-header': require("components/Share/ListHeader.vue").default
  },
};
</script>

<style>
</style>