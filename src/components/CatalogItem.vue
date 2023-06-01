<template>
  <q-card class="card-item">
   <img
      class="card-item-img"
      :src="`${product.img}`"
      :id="product.id"
      @click="toProductCard"
    />
    <q-card-section :id="product.id" @click="toProductCard">
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-h8">{{ product.description }}</div>
      <div class="text-subtitle2">
        Цена: <strong>{{ product.price }}</strong> Руб.
      </div>
    </q-card-section>
    <div class="flex justify-between items-center">
    <q-card-section >
      {{ product.type }}
    </q-card-section>
      <div class="q-pa-md q-gutter-sm">
        <q-btn 
        round size="sm" 
        class="btnQuantity" 
        icon="remove"  
        :id="product.id"
        @click="deleteFromCart" 
        />
      <input
        class="quantity__input"
        type="text"
        v-model="quantityProd"
              />
      <q-btn 
        round  
        size="sm" 
        class="btnQuantity" 
        icon="add"  
        :id="product.id"
        @click="handleClick"/>
      </div>
    </div>
    <div class="text-center">
      <q-btn
        :id="product.id"
        class="btn-add"
        @click="handleClick"
        :lable="btnName"
        > {{ lable }} </q-btn>
    </div>
  </q-card>
</template>

<script>
import { storeToRefs } from "pinia";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "CatalogItem",
  props: {
    product: {
      type: Object,
      default() {},
    },
    lable: {
      type: String,
    },
    func: {
      type: Function,
    },
  },
  setup(props) {
    const store = useStore();
    const { cart } = storeToRefs(store);
    const router = useRouter();
    const quantityProd = ref(0);
    const toProductCard = (e) => {
      router.push({ name: "ProductPage", params: { id: e.currentTarget.id } });
    };
    const handleClick = (e) => {
      const add = props.func;
      add(e.currentTarget.id);
      quantityProd.value++;
    };
    return {
      cart,
      handleClick,
      toProductCard,
      quantityProd,
      deleteFromCart(index) {
        store.cart.splice(index, 1);
        quantityProd.value--;
        }
    };
  },
};
</script>
<style>
.card-item {
  cursor: pointer;
  border: 1px solid #3c0979;
  border-radius: 5px;
  width: 250px;
}
.card-item-img {
  width: 300px;
  height: 250px;
  margin-top: 10px;
}
.btn-add {
  border: 1px solid #3c0979;
  border-radius: 5px;
  margin-bottom: 20px;
  color: white;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
}
.btn-add:hover {
  background: linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
}
.quantity__input {
  width: 20px;
}
.btnQuantity {
  background: #301d6e;
  color: white;
}
</style>
