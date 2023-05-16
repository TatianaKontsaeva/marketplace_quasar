<template>
    <div class="catalog">
      <div class="catalog__panel-options">
        <div class="q-pa-md" style="max-width: 300px">
          <div class="q-gutter-md">
            
            <q-select
              class="category"
              standard
              v-model="model"
              :options="options"
              label="Category"
              emit-value
              map-options
            >
              <template
                v-slot:option="{ itemProps, opt, selected, toggleOption }"
              >
                <q-item v-bind="itemProps">
                  <q-item-section>
                  <q-item-label v-html="opt.label" />
                </q-item-section>
                  <q-item-section side>
                    <q-toggle
                      :model-value="selected"
                      @update:model-value="toggleOption(opt)"
                      color="secondary"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </div>
      <div class="catalog__wrap">
        <div v-if="loading">
          <q-spinner-hourglass
            indeterminate
            rounded
            size="50px"
            color="secondary"
            class="q-ma-md"
          />
        </div>
        <Slide
          v-for="book in BOOKS_FILTER.values"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { watch, ref, reactive, computed } from "vue";
  import Slide from "../components/v-catalog-slide.vue";
  import { provideApolloClient } from "@vue/apollo-composable";
  import gql from "graphql-tag";
  import { useMutation } from "@vue/apollo-composable";
  import { ApolloClient } from "@apollo/client/core";
  import { getClientOptions } from "src/apollo/index";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  export default {
    components: {
      Slide,
    },
    setup() {
      const store = useStore();
      store.dispatch("GET_BOOKS");
      const BOOKS = reactive([]);
      const BOOKS_FILTER = reactive([]);
      const loading = computed(() => store.getters.LOADING_CATALOG);
      BOOKS.values = computed(() => store.getters.BOOKS);
      BOOKS_FILTER.values = BOOKS.values;
  
      watch(loading, () => (BOOKS_FILTER.values = store.getters.BOOKS));
  
      let model = ref("All books");
      const categoryParam = useRouter().currentRoute.value.query.category;
  
      switch (categoryParam) {
        case "adult": {
          model = ref("Books for adult");
          setTimeout(() => {
            BOOKS_FILTER.values = BOOKS.values.filter((p) => {
              console.log(p.category);
              return p.category == true;
            });
          }, 300);
          break;
        }
        case "children": {
          model = ref("Books for children");
          setTimeout(() => {
            BOOKS_FILTER.values = BOOKS.values.filter(
              (p) => p.category == false
            );
          }, 300);
          break;
        }
        default: {
          model = ref("All books");
        }
      }
  
      watch(model, () => {
        switch (model.value) {
          case "All books":
            BOOKS_FILTER.values = BOOKS.values;
            break;
          case "Books for adult":
            BOOKS_FILTER.values = BOOKS.values.filter((p) => {
              return p.category == true;
            });
            break;
          case "Books for children":
            BOOKS_FILTER.values = BOOKS.values.filter(
              (p) => p.category == false
            );
            break;
          
        }
        return BOOKS_FILTER;
      });
  
      const sendBookToCart = function (index) {
        const apolloClient = new ApolloClient(getClientOptions());
  
        provideApolloClient(apolloClient);
  
        const { mutate } = useMutation(
          gql`
            mutation MyMutation(
              $category: Boolean!
              $name: String!
              $author: String!
              $genre: String!
              $price: Int!
              $url: String!
            ) {
              insert_cartItems_one(
                object: {
                  category: $category 
                  name: $name
                  author: $author
                  genre: $genre
                  price: $price
                  url: $url
                }
              ) {
                category
                name
                author
                genre
                price
                url
          
              }
            }
          `,
          () => ({
            variables: {
              category: book.category,
              name: book.name,
              author: author.book,
              genre: book.genre,
              price: book.price,
              url: book.url,
            },
          })
        );
        mutate();
      };
      return {
        loading,
        BOOKS_FILTER,
        model,
        sendBookToCart,
        BOOKS,
        options: [
          {
            label: "All books",
            value: "All books",
          },
          {
            label: "Books for adult",
            value: "Books for adult",
          },
          {
            label: "Books for children",
            value: "Books for children",
          },
    
        ],
      };
    },
  };
  </script>
  
  <style lang="scss">
  
  </style>