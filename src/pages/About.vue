<template>
    <transition appear @before-enter="beforeEnter" @enter="enter">
     <q-page class="flex">
       <div class="q-pa-lg">
         <h2>About Us</h2>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod necessitatibus enim temporibus aliquam fugit dolore ut ducimus sit, rem vel quasi modi nihil nemo magnam reiciendis minima obcaecati molestiae harum?</p>
       </div>
     </q-page>
   </transition>
 </template>
 
 <script>
 import { defineComponent } from 'vue'
 
 
 export default defineComponent({
   name: 'contacts',
   
   
 })
 </script>
 <style lang="scss">
   body {
     color: $dark;
   }
 </style>