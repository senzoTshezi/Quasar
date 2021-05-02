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
             v-select-all
             autofocus 
             ref="name"
             /> 
  </div>
</template>

<script>
import {selectAll} from 'src/directives/directive-select-all'
export default {
    props:['name'],
    directives:{
      selectAll
    }
}
</script>

<style>

</style>