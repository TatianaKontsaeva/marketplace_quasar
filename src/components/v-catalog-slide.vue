<template>
    <div class="slider-page__wrapper">
      <div class="slider-page__item">
        <div class="slider-page__wrapper">
          <div class="slider-page__book book">
            <div class="book__img">
              <img :src="require('../assets/images/' + book.url)" />
            </div>
            <div class="book__title">
                <div>{{book.category}}<p>{{book.name}}</p></div>
            </div>
        
          </div>
          <div class="slider-page__book-hover hover-book">
            <div class="hover-book__title">
              <p>{{book.name}}</p>
            </div>
            <div class="hover-book__options">
              <div class="hover-book__option">
                Category:
                <p>{{book.category}}</p>
              </div>
            </div>
            <div class="hover-book__cart" @click="sendBookToCart(book); increment()">
              <q-item class="q-item-car-img" v-ripple>
                  <img src="#" alt="" />
              </q-item>
              </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script></script>
  <script>  
    
  import { provideApolloClient } from "@vue/apollo-composable";
  import gql from "graphql-tag";
  import { useMutation } from "@vue/apollo-composable";
  import { ApolloClient } from "@apollo/client/core";
  import { getClientOptions } from "src/apollo/index";
  import { useStore } from "vuex";
  
  export default {
    props: {
      product: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    setup(props) {
      const store = useStore();
      const refetch = store.getters.REFETCH;
      const increment = () => store.commit('setQuantityBooksCart', 1)
  
      const sendBookToCart = function (book) {
        const apolloClient = new ApolloClient(getClientOptions());
  
        provideApolloClient(apolloClient);
  
        const { mutate: sendBook,  } = useMutation(
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
        sendBook();
      };
      return {
        sendBookToCart,
        refetch,
        increment
      };
    },
  };
</script>
  

  
  <style lang="scss">
 
  </style>