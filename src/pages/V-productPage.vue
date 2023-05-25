<template>
  <div class="flex q-pa-md justify-center items-center">
    <div>
      <img 
      class="product-page-img" 
      :src="`${item.img}`" 
      />
    </div>
    <div>
      <div class="q-pa-md flex">
        <q-list bordered class="q-pa-md flex justify-between card_product">
          <q-item >
            <q-item-section>
              <q-item-label class="text-h5">{{ item.name }}</q-item-label>
              <q-item-label class="text-h7">{{ item.description}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Цена</q-item-label>
              <q-item-label>{{
               item.price
              }} Руб.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="justify-center">
            <q-btn 
            class="btn-buy"
            :id="item.id" 
            @click="add"
            label="Купить"/>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "src/store/store";

export default {
  name: "V-productPage",
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
.product-page-img {
  max-width: 400px;
  height: 200px;
}
.btn-buy {
  width: 100px;
  height: 30px;
  border: 1px solid #3c0979;
  border-radius: 5px;
  margin-bottom: 20px;
  color: white;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
}
.btn-add:hover {
  background: linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
}
.card_product {
  border: 1px solid #3c0979;
}

</style>
