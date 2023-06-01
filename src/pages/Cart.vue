<template>
   <h2 class="flex justify-center q-pa-md">Корзина</h2>
  <q-page class="flex justify-center">
    <div v-if="!products.length" class="text-h4 q-pa-md">В корзине пока ничего нет... </div>
    <div v-else>
      <div class="flex justify-between cart_btns">
        <q-btn class="q-ma-xs btn-back" to="/catalog" label="Назад в каталог"/>
        <q-btn class="q-ma-xs btn-pay" @click="dialog = true" label="Купить"/>
      </div>
      <div class="q-pa-md row justify-center q-gutter-md">
        <cart-item
          v-for="product in products"
          :key="product.id"
          :cart_item_data="product" 
          :func="remoteFromCart"
        />
      </div>
    </div>
  </q-page>
    <q-dialog v-model="dialog">
      <div class="q-pa-md form-pay">
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        standard
        v-model="userName"
        label="Ваше имя и фамилия*"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите имя']"
      />
      <q-select v-model="model" :options="options" label="Выберите способ получения" />

      <q-input
        standard
        v-model="cc"
        label="Введите номер карты *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите номер карты',
        ]"
      />
      <q-input
        standard
        v-model="exp_date"
        label="Введите срок действия карты *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите срок действия',
        ]"
      />
        <q-input
        standard
        v-model="cvc"
        label="Введите cvc код *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите cvc код',
        ]"
      />
      <q-toggle v-model="accept" label="Я принимаю условия" />
      <div>
        <q-btn label="Оплатить" type="submit" class="btn_for_pay" @click="alert = true"/>
        <q-btn label="Reset" type="reset" color="dark" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</q-dialog>
<q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Внимание</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
         Ваша заявка принята! С вами свяжутся в ближайшее время!
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script>
import CartItem from "src/components/CartItem.vue";
import { useStore } from "../store/store";
import { computed, ref } from "vue";

export default {
  name: "Cart",
  props: {
    cart_data: {
      type: Array,
        default() {
          return [];
        }
  },
    func: {
      type: Function,
  },
    },
    components: {
    CartItem
  },
  data() {
    return {
      products: [],
    };
  },
  setup() {
    const store = useStore();
    const products = computed(() => store.cart ?? []);
    const btnName = "Удалить";
    const remoteFromCart = (id) => {
      store.removeFromCart(id);
    };
    const userName = ref(null)
    const cc = ref(null)
    const exp_date = ref(null)
    const accept = ref(false)
    const cvc = ref(null)
    let incrementItem = computed(() =>
      store.cart?.reduce((acc, product) => acc + product.id, 0)
    );
    return {
      incrementItem,
      products,
      btnName,
      dialog: ref(false),
      alert: ref(false),
      userName,
      cc,
      exp_date,
      cvc,
      accept,
      model: ref(null),
      options: [
        'Курьером', 'В пункте выдачи', 'Самовывоз из магазина', 
      ],
      remoteFromCart,
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },
      onReset () {
        userName.value = null
        age.value = null
        accept.value = false
      }
    }
  },
}
</script>
<style lang="scss">
 .btn-pay {
    border: 1px solid #091b79;
    color: #091b79;
  }
  .btn-pay:hover {
    background: #091b79;
    color: white;
  }
  .btn-back {
    border: 1px solid #711297;
    color: #711297;
  }
  .btn-back:hover {
    background:  #711297;
    color: white;
  }
  .form-pay {
    background: #7786d0;
    color: white;
  }
  .form-pay {
    background: #8695df;
    width: 600px;
  }
  .btn_for_pay {
    background: #091b79;
    color: white;
  }
</style>
