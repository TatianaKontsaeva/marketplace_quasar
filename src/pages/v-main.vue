<template>
    <q-page class="flex flex-center">
      <div class="content-category">
      <div class="content-category__adult">
        <div class="content-category__text">
          <p>Books for adult</p>
        </div>
        <img src="../assets/images/adultbook.jpg" alt="Adult book"  class="content-category__img" />
        <div class="content-category__btn">
          <router-link :to="{ path: 'catalog', query: { category: 'adult' } }"
            ><button class="content-category__link_more">More details</button></router-link
          >
        </div>
      </div>
      <div class="content-category_children">
        <div class="content-category__text">
          <p>Books for children</p>
        </div>

        <div>
          <img src="../assets/images/childbooks.jpg" alt="children book" class="content-category__img" />
        </div>
        <div class="content-category__btn">
          <router-link :to="{ path: 'catalog', query: { category: 'children' } }"
            ><button class="content-category__link_more">More details</button></router-link
          >
        </div>
      </div>
    </div>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Main',
    emits: ["adult", "children"],
  setup(props) {
    const adult = "Books for adult";
    const children = "Books for children";
    const clickAdult = function () {
      emit("clickAdult", adult);
    };
    const clickChildren = function () {
      emit("clickChildren", children);
    };

    return {
      clickAdult,
      clickChildren,
   
    };
  },

  })
  </script>

  <style lang="scss">
  .content-category {
    display: flex;
    column-gap: 150px;

    &__img {
    max-width: 400px;
  }
    &__text {
      font-size: 18px;
      color: $cherry-wine;
  }
    &__link_more {
      background: white;
      color: $cherry-wine;
      border: 1px solid $cherry-wine;
      border-radius: 3px;
  }
    &__link_more:hover {
      cursor: pointer;
      background: $cherry-wine;
      color: white;
  }
  }
  @media (max-width: 1024px) {
  .content-category {
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
  }
}
</style>
  