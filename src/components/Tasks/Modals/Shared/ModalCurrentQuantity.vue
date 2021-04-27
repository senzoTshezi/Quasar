<template>
  <div class="row q-mb-sm">
     <q-input type="number" clearable outlined :value="currentQuantity" @input="$emit('update:currentQuantity',$event)" label=" Current Quantity" class="col" :rules="[val => !!val || 'Field is required']" ref="current"/> 
  </div> 
</template>

<script>
export default {
    props:['currentQuantity']
}
</script>

<style>

</style>