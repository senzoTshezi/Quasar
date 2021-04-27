<template>
  <div>
     <list-header bgColor="bg-orange-4">Task Todo </list-header>
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
</template>

<script>
import ListHeader from 'components/Share/ListHeader.vue';
export default {
  props: ["tasksTodo",],
  components: {
    'task': require("components/Tasks/Task.vue").default,
    'list-header': require("components/Share/ListHeader.vue").default
  },
};
</script>

<style>
</style>