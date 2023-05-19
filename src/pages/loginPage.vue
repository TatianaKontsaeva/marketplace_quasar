<template>
    <q-layout>
      <q-page-container>
        <q-page class="flex flex-center">
          <q-card
            class="row ms-login items-center q-pa-none q-ma-none shadow-24"
          >
            <q-card-section
              class="col-md-8 col-lg-8 col-sm-12 sol-xs-12 float-left"
            >
              <q-card-section class="items-center">
                <div>
                  <q-form
               >
                  <span class="text-subtitle1 text-weight-bold text-grey-7"
                      >Welcome to Store</span
                    >
                    <q-input
                      dense
                      outlined
                      v-model="username"
                      label="Username"
                      lazy-rules
                    />
  
                    <q-input
                      dense
                      type="password"
                      outlined
                      v-model="password"
                      label="Password"
                      lazy-rules
                    />
                    <q-checkbox
                      class="text-grey-8"
                      dense
                      v-model="remember_me"
                      label="Remember me"
                    />
                    <div>
                      <q-item id="auth-links">
                        <q-btn
                          id="btn"
                          class="text-capitalize bg-teal-6"
                          size="sm"
                          style="width: 75px"
                          dense
                          label="Login"
                          to="/catalog"
                          type="button"
                          color="accent"
                        />
                      </q-item>
                      <q-btn
                        class="float-right text-blue-9"
                        size="sm"
                        style="width: 75px; border: 1px solid #52369e"
                        dense
                        label="Sign Up"
                        type="button"
                      />
                    </div>
                  </q-form>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "admin",
        password: "admin",
        remember_me: false,
      };
    },
    mounted() {},
    methods: {},
  };
  </script>
  <style>
  
  </style>