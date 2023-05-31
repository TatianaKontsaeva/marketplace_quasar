<template>
    <q-page class="flex justify-center cart-item">
            <img 
            class="cart-item__img" 
            :src="`${cart_item_data.img}`"
            :id="cart_item_data.id"
            alt="picture">
            <div>
                <p>{{ cart_item_data.name }}</p>
                <p>{{ cart_item_data.price }} &#8381;</p>
                <p>{{ cart_item_data.description }}</p>
            </div>
            <q-btn
                :id="cart_item_data.id"
                class="deleteBtn"
                @click="deleteFromCart">
                Удалить
            </q-btn> 
    </q-page>
</template>
<script>
import { storeToRefs } from "pinia";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";
import { defineComponent, computed } from "vue";

export default defineComponent ({
    name: "CartItem",
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {};
            }
        },
        func: {
            type: Function,
        },
    },
    data() {
        return {};
    },
    setup() {
    const store = useStore();
    const { cart } = storeToRefs(store);
    const router = useRouter();
    const products = computed(() => store.cart ?? []);
    const remoteFromCart = (id) => {
      store.removeFromCart(id);
    };
    return {
        cart,
        router,
        products,
        remoteFromCart,
        deleteFromCart(index) {
            store.cart.splice(index, 1)
        }
    }
}
})
</script>
<style lang="scss">
    .cart-item {
        max-width: 300px;
        border: 1px solid rgb(50, 8, 87);
        padding: 20px;

    }
    .cart-item__img {
        width: 300px;
        height: 200px;
    }
    .quantity__btn {
        cursor: pointer; 
        padding-top: 8px;
        background: linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(9, 9, 121) 35%, rgb(139, 0, 255) 100%);
        border: 1px solid #b39ddb;
        border-radius: 50%;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 8px;
        margin: 10px;
        color: white;
    }
    .deleteBtn {
        width: 150px;
        height: 35px;
        color:#b39ddb;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(139,0,255,1) 100%);
        border-radius: 20px;
        border:1px solid #b39ddb;
    }
    .deleteBtn:hover {
        background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(139,0,255,1) 100%);
        color: white;
    }
</style>


