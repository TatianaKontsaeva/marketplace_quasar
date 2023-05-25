import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloClient from "../apollo/client.js";

provideApolloClient(apolloClient);

export const useStore = defineStore("filter", {
  state: () => ({
    items: null,
    cart: [],
    types: [],
    allTypes: [],
    isCatalog: false
  }),
  getters: {},
  actions: {
    addToCart(id) {
      this.items.forEach((elem) => {
        if (elem.id == id) {
          if (!this.cart.includes(elem)) {
            this.cart.push(elem);
          }
        }
      });
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((el) => el.id != id);
    },
    getTypes() {
      this.allTypes = this.items.map((elem) => elem.type);
    },
  },
});
