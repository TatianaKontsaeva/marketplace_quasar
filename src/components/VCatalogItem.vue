<template>
  <q-card class="card-item">
   <img
      class="card-item-img"
      :src="`${item.img}`"
      :id="item.id"
      @click="toProductCard"
    />
    <q-card-section :id="item.id" @click="toProductCard">
      <div class="text-h6">{{ item.name }}</div>
      <div class="text-h8">{{ item.description }}</div>
      <div class="text-subtitle2">
        Цена: <strong>{{ item.price }}</strong> Руб.
      </div>
    </q-card-section>
    <q-card-section >
      {{ item.type }}
    </q-card-section>
    <div class="text-center">
      <q-btn
        :id="item.id"
        class="btn-add"
        @click="handleClick"
        :lable="btnLable"
        > {{ lable }} </q-btn>
    </div>
  </q-card>
</template>

<script>
import { storeToRefs } from "pinia";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";

export default {
  name: "VCatalogItem",
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
      router.push({ name: "V-productPage", params: { id: e.currentTarget.id } });
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
</style>
