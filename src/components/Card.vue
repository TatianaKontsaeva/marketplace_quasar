<template>
    <q-card class="product-card">
      <img
        class="card-img"
        :src="`${item.img}`"
        :id="item.id"
        @click="toProductCard"
      />
  
      <q-card-section 
        :id="item.id" 
        @click="toProductCard">
        <div class="text-h6">{{ item.type }}</div>
        <div class="text-subtitle2">
          Цена:
          <strong>{{
            new Intl.NumberFormat("ru", {
              style: "currency",
              currency: "RUB",
            }).format(item.price)
          }}</strong>
        </div>
      </q-card-section>
  
      <q-card-section class="q-pt-none card-description">
        {{ item.description }}
      </q-card-section>
      <div class="text-right">
        <q-btn
          class="card-btn"
          :id="item.id"
          @click="handleClick"
          >{{ lable }}</q-btn
        >
      </div>
    </q-card>
  </template>
  
  <script>
  import { storeToRefs } from "pinia";
  import { useStore } from "../store/filter";
  import { useRouter } from "vue-router";
  
  export default {
    name: "Card",
    props: {
      item: {
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
  
      const toProductCard = (e) => {
        router.push({ name: "productPage", params: { id: e.currentTarget.id } });
      };
      const handleClick = (e) => {
        const add = props.func;
        add(e.currentTarget.id);
      };
      return {
        cart,
        handleClick,
        toProductCard,
      };
    },
  };
  </script>
  
  <style>
  .card-img {
    height: 250px;
    object-fit: contain;
  }
  .product-card {
    min-width: 250px;
    cursor: pointer
  }
  .card-description {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-btn {
    background: white;
    color: #091b79;
    border: 1px solid #091b79;
  }
  </style>