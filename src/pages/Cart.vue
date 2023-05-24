<template>
  <q-page class="flex">
    <div class="q-pa-lg">
      <h2>Корзина</h2>
        <q-page class="flex justify-center">
          <h3 v-if="!items.length">В корзине ничего нет...</h3>
          <div v-else>
            <div class="flex justify-between">
              <q-btn 
                class="buy-btn" 
                @click="dialog = true" 
                label="Купить"/>
              <q-btn 
                class="back-btn" 
                to="/catalog" 
                label="Назад к товарам"/>
            </div>
            <div class="q-pa-md row justify-center q-gutter-md">
              <ms-card
                v-for="item in items"
                :key="item.id"
                :item="item"
                :lable="btnLable"
                :func="remoteFromCart"
              />
            </div>
          </div>
        </q-page>
        <div class="q-pa-md q-gutter-sm">
          <q-dialog
            v-model="dialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="text-white">
              <q-bar>
                <q-space></q-space>

                <q-btn
                  dense
                  flat
                  icon="minimize"
                  @click="maximizedToggle = false"
                  :disable="!maximizedToggle"
                >
                  <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
                    >Меньше</q-tooltip
                  >
                </q-btn>
                <q-btn
                  dense
                  flat
                  icon="crop_square"
                  @click="maximizedToggle = true"
                  :disable="maximizedToggle"
                >
                  <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
                    >Больше</q-tooltip
                  >
                </q-btn>
                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip class="bg-white text-primary">Закрыть</q-tooltip>
                </q-btn>
              </q-bar>

              <q-card-section class="text-center">
                <div class="text-h6 text-grey">Заполните необходимую информацию</div>
              </q-card-section>

              <q-card-section class="q-pt-none flex justify-center">
                <div class="q-gutter-md" style="min-width: 700px">
                  <q-form>
                    <q-input 
                      v-model="text" 
                      label="Страна"
                      />
                    <q-input 
                      v-model="text" 
                      label="Город"
                      />
                    <q-input 
                      v-model="text" 
                      label="Адрес"
                      />
                    <q-select
                      v-model="model"
                      :options="options"
                      label="Детали оплаты"
                    ></q-select>
                    <q-input
                      v-if="model === 'Credit card'"
                      v-model="text"
                      label="Банковской картой"
                    />
                    <q-input
                      v-if="model === 'Cash to courier'"
                      v-model="text"
                      label="Наличные курьеру"
                    />
                  </q-form>
                </div>
              </q-card-section>
              <div class="text-center">
                <q-btn 
                label="Далее" 
                v-close-popup 
                color="blue"
                />
              </div>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
<script >
import { defineComponent,computed, ref } from 'vue'
import Card from "src/components/Card.vue";
import { useStore } from "../store/filter";

export default defineComponent({
name: 'Cart',
components: {
    Card,
  },
  data() {
    return {
      items: [],
    };
  },
  setup() {
    const store = useStore();
    const items = computed(() => store.cart ?? []);

    const btnLable = "Delete";

    const remoteFromCart = (id) => {
      store.removeFromCart(id);
    };
    return {
      items,
      btnLable,
      dialog: ref(false),
      maximizedToggle: ref(true),
      model: ref(null),
      options: [
        "Credit card",
        "Cash to courier",
      ],
      remoteFromCart,
    };
  },
})
</script> 
<style>
  .buy-btn {
    max-width: 250px;
    height: 35px;
    background: #091b79;
    color: white;
    margin-right: 20px;
  }
  .back-btn {
    max-width: 250px;
    height: 35px;
    background: white;
    color: #091b79;
    border: 1px solid #091b79;
  }
</style>