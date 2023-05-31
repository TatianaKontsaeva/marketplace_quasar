<template>
  <q-page class="flex">
      <div class="q-pa-lg">
        <div class="flex justify-between">
          <div class="contents">
          <div>
          <h2>Каталог</h2>
        </div>
      <div style="cursor:pointer;">
        <q-item to="/cart" exact clickable v-ripple>
          <q-icon name="shopping_basket" size="md" color="primary"/>
          {{ cart.length }}
        </q-item>
        <q-item-section>
          <div v-if="totalPrice>0"> Общая стоимость: {{ totalPrice }} </div>
          </q-item-section>
       
      </div>
      </div>
        <div class="items-center">
      <q-input
        @keyup.enter="searchRequest"
        standard
        bottom-slots
        v-model="productSearch"
        label="Поиск по товарам"
      >
        <q-icon
          name="search"
          @click="searchRequest" 
          class="btn-search"
          size="md" />
      </q-input>
      <div>
        <q-btn 
          class="btn q-ma-xs btn-type" 
          @click="sortByType" 
          label="По типу"
        />
        <q-btn 
          class="btn q-ma-xs btn-price" 
          @click="sortByPrice" 
          label="По цене" 
        />
      </div>
      <div class="q-pa-md row items-start justify-center q-gutter-md">
        <catalog-item
          v-for="product in products"
          :key="product.id"
          :product="product"
          :lable="btnName"
          :func="addToCart"
        />
      </div>
    </div>
  </div>
      <div v-if="!products.length" class="flex column justify-center">
        <div>
        <q-spinner-ball
          color="primary"
          size="10em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
      </div>
    <h3 >Cкоро здесь появятся товары...</h3>
    </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import CatalogItem from "src/components/CatalogItem.vue";
import { useStore } from "../store/store";
import { computed } from "vue";
import { queries } from "src/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Catalog",
  components: {
    CatalogItem,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const cart = computed(() => store.cart ?? []);
    const products = computed(() => store.products ?? []);
    const btnName = "В корзину";
    const productSearch = ref(null);

    const addToCart = (id) => {
      store.addToCart(id);
    };
    let totalPrice = computed(() =>
      store.cart?.reduce((acc, product) => acc + product.price, 0)
    );
    const sortByType = () => {
      if (store.types.length) {
        const { result } = useQuery(queries.sort, {
          type: store.types,
          sort: { type: "asc" },
        });
        store.products = computed(() => result.value?.product ?? []);
        return;
      }
      const { result } = useQuery(queries.sortByType);
      store.products = computed(() => result.value?.product ?? []);
    };
    const sortByPrice = () => {
      if (store.types.length) {
        const { result } = useQuery(queries.sort, {
          type: store.types,
          sort: { price: "asc" },
        });
        store.products = computed(() => result.value?.product ?? []);
        return;
      }
      const { result } = useQuery(queries.sortByPrice);
      store.products = computed(() => result.value?.product ?? []);
    };
    
    const showNotif = () => {
      $q.notify({
        type: "warning",
        message:  "Такого товара нет",
      });
    };
    
    const searchRequest = () => {
      const { result, loading } = useQuery(queries.searchData, {
        like: `%${productSearch.value}%`,
      });
      const getAll = computed(() => result.value?.product ?? []);
      store.products = getAll;
      setTimeout(() => {
        if (!store.products.length) {
          const { result } = useQuery(queries.getAll);
          store.products = computed(() => result.value?.product ?? []);

          showNotif();
        }
      }, 500);
      productSearch.value = "";
    };
    onMounted(() => {
      store.isCatalog = true;
    });
   
    return {
      products,
      sortByType,
      sortByPrice,
      addToCart,
      productSearch,
      searchRequest,
      showNotif,
      btnName,
      cart,
      totalPrice,
    };
  },
});
</script>

<style lang="scss">
  .btn-search {
    margin-top: 10px;
    cursor: pointer;
  }
  .btn-type {
    border: 1px solid #091b79;
    color: #091b79;
  }
  .btn-type:hover {
    background: #091b79;
    color: white;
  }
  .btn-price {
    border: 1px solid #711297;
    color: #711297;
  }
  .btn-price:hover {
    background:  #711297;
    color: white;
  }
  .contents {
    display: contents;
  }
</style>
