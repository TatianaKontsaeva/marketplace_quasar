<template>
    <transition appear @before-enter="beforeEnter" @enter="enter">
    <q-page class="flex">
      <div class="q-pa-lg">
        <h2>Help</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia delectus id similique, corrupti est voluptatum laborum unde dolorum dicta cupiditate qui provident praesentium! Deserunt quia numquam fuga id ducimus nemo.</p>
      </div>
    </q-page>
  </transition>
  </template>
  
<script>
  import { defineComponent } from 'vue'
  
    export default defineComponent({
    name: 'help',
})
</script>
  
  <style lang="scss">
   
  </style>