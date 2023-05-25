<template>
  <q-page class="flex">
      <div class="q-pa-lg">
        <div class="flex justify-between">
          <div>
          <h2>Каталог</h2>
        </div>
        <div class="items-center">
      <q-input
        @keyup.enter="searchRequest"
        standard
        bottom-slots
        v-model="dataSearch"
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
        <v-catalog-item
          v-for="item in items"
          :key="item.id"
          :item="item"
          :lable="btnLable"
          :func="addToCart"
        />
      </div>
    </div>
  </div>
      <div v-if="!items.length" class="flex column justify-center">
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
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import VCatalogItem from "src/components/VCatalogItem.vue";
import { useStore } from "../store/store";
import { computed } from "vue";
import { queries } from "src/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Catalog",
  components: {
    VCatalogItem,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const items = computed(() => store.items ?? []);
    const btnLable = "В корзину";
    const dataSearch = ref(null);

    const addToCart = (id) => {
      store.addToCart(id);
    };
    const sortByType = () => {
      if (store.types.length) {
        const { result } = useQuery(queries.sort, {
          type: store.types,
          sort: { type: "asc" },
        });
        store.items = computed(() => result.value?.product ?? []);
        return;
      }
      const { result } = useQuery(queries.sortByType);
      store.items = computed(() => result.value?.product ?? []);
    };
    const sortByPrice = () => {
      if (store.types.length) {
        const { result } = useQuery(queries.sort, {
          type: store.types,
          sort: { price: "asc" },
        });
        store.items = computed(() => result.value?.product ?? []);
        return;
      }
      const { result } = useQuery(queries.sortByPrice);
      store.items = computed(() => result.value?.product ?? []);
    };
    const showNotif = () => {
      $q.notify({
        type: "warning",
        message:  "Такого товара нет",
      });
    };
    const searchRequest = () => {
      const { result, loading } = useQuery(queries.searchData, {
        like: `%${dataSearch.value}%`,
      });
      const getAll = computed(() => result.value?.product ?? []);
      store.items = getAll;
      setTimeout(() => {
        if (!store.items.length) {
          const { result } = useQuery(queries.getAll);
          store.items = computed(() => result.value?.product ?? []);

          showNotif();
        }
      }, 500);
      dataSearch.value = "";
    };
    onMounted(() => {
      store.isCatalog = true;
    });

    onUnmounted(() => {
      store.isCatalog = false;
    });

    return {
      items,
      sortByType,
      sortByPrice,
      btnLable,
      addToCart,
      dataSearch,
      searchRequest,
      showNotif,
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
</style>
