<template>
  <div class="row q-mb-sm">
      <!-- <q-input clearable autofocus outlined v-model="taskToSubmit.name" label="Task Name" class="col" :rules="[val => !!val || 'Field is required']" ref="name"/>   -->
          <q-input 
             clearable
             outlined 
             :value="name"
             @input="$emit('update:name',$event)" 
             label="Task Name" 
             class="col" 
             :rules="[val => !!val || 'Field is required']" 
             autofocus ref="name"
             /> 
  </div>
</template>

<script>
export default {
    props:['name']
}
</script>

<style>

</style>