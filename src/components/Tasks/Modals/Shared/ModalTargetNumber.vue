<template>
  <div class="row q-mb-sm">
    <q-input clearable type="number" outlined :value="targetNumber" @input="$emit('update:targetNumber',$event)" label="Target Number" class="col" :rules="[val => !!val || 'Field is required']" ref="target"/> 
</div> 
</template>

<script>
export default {
    props:['targetNumber']
}
</script>

<style>

</style>