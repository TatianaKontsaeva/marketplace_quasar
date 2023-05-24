<template>
    <div class="flex q-pa-md justify-center items-center">
      <div>
        <img :src="`${item.img}`" />
      </div>
      <div>
        <div class="q-pa-md">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>{{ item.type }} </q-item-section>
            </q-item>
  
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Description</q-item-label>
                <q-item-label caption>{{ item.description }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>Цена</q-item-label>
                <q-item-label>{{
                  new Intl.NumberFormat("ru", {
                    style: "currency",
                    currency: "RUB",
                  }).format(item.price)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-btn :id="item.id" @click="add">Buy</q-btn>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from "src/store/store";
  
  export default {
    name: "ProductPage",
    props: ["id"],
    setup(props) {
      const store = useStore();
      const item = store.items.filter((elem) => elem.id == props.id)[0];
      const add = (e) => store.addToCart(e.currentTarget.id);
      return {
        item,
        add,
      };
    },
  };
</script>
  
<style>
</style>