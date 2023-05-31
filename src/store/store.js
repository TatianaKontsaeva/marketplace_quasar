import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloClient from "../apollo/client.js";

provideApolloClient(apolloClient);

export const useStore = defineStore("filter", {
  state: () => ({
    products: null,
    cart: [],
    types: [],
    allTypes: [],
    isCatalog: false,
    total: 0,
    quantityProductsCart: 0,
  }),
  getters: {},
  actions: {
    addToCart(id) {
      this.products.forEach((elem) => {
        if (elem.id == id)  {
          if (!this.cart.includes(elem)) {
            this.cart.push(elem);
          } else if (this.cart.includes(elem)) {
            this.cart.push(elem);
          
          }
        }
      });
    },
    INCREMENT(product) {
      quantityProd.value++;
      this.totalPrice += product.price;
    },
    DECREMENT(product) {
      quantityProd.value--;
      this.totalPrice -= product.price;
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((el) => el.id != id);
    },
    getTypes() {
      this.allTypes = this.products.map((elem) => elem.type);
    },
  },
  mutations: {
    INCREMENT: (state, index) => {
      state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity >= 1) {
        state.cart[index].quantity--;
    } 
    },
    

  }
});
