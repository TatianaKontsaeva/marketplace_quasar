<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-xl">
        <div class="text-h3">BookStore</div>
        
      </div>
      
      <q-img 
      class="header-image absolute-top bg-dimmed"
      src="../assets/images/main.png"/>
    </q-header>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
      <q-list padding>
        <q-toolbar class="header__bottom">
          <div class="bottom-header__container">
            <div class="bottom-header__column">
              <ul class="bottom-header__actions actions-header">
                <li>
                  <div id="auth-links" class="auth-links">
                    <button
                      onclick="Clerk.openSignIn()"
                      class="actions-header__item actions-header_login"
                    >
                      <span>Sign in</span>
                    </button>
                    <button
                      onclick="Clerk.openSignUp()"
                      class="actions-header__item actions-header_reg"
                    >
                      <span>Sign up</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
      </div>
    </q-toolbar>
        <q-item to="/" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            Catalog
          </q-item-section>
        </q-item>
        <q-item to="/help" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="contact_support" />
          </q-item-section>
          <q-item-section>
            Help
          </q-item-section>
        </q-item>
        <q-item to="/about" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info_outline" />
          </q-item-section>
          <q-item-section>
            About Us
          </q-item-section>
        </q-item>
        <q-item to="/contacts" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="contact_page" />
          </q-item-section>
          <q-item-section>
            Contacts
          </q-item-section>
        </q-item>
        <q-item to="/cart" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_basket" />
          </q-item-section>
          <q-item-section>
            Cart
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
    </q-page-container>

   
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Clerk from "@clerk/clerk-js";

//import Clerk from "@clerk/clerk-js";
const publishableKey = "pk_test_dWx0aW1hdGUtcHJpbWF0ZS01MS5jbGVyay5hY2NvdW50cy5kZXYk"

const clerk = new Clerk(publishableKey);
const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    // Load Clerk environment and session if available
    await Clerk.load();

    const userButton = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");

    Clerk.addListener(({ user }) => {
      // Display links conditionally based on user state
      authLinks.style.display = user ? "none" : "flex";
    });

    if (Clerk.user) {
      // Mount user button component
      Clerk.mountUserButton(userButton);
      userButton.style.margin = "auto";

      sessionStorage.setItem(
        "token",
        await Clerk.session?.getToken({ template: "hasura" })
      );
    }
  } catch (err) {
    console.error("Error starting Clerk: ", err);
  }
};

(() => {
  const script = document.createElement("script");
  script.setAttribute("data-clerk-publishable-key", publishableKey);
  script.async = true;
  script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
  script.crossOrigin = "anonymous";
  script.addEventListener("load", startClerk);
  script.addEventListener("error", () => {
    document.getElementById("no-frontend-api-warning").hidden = false;
  });
  document.body.appendChild(script);
})();

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]
export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)

      return {
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
  },
  
  

});
</script>
<style lang="scss">
  .q-drawer__content {
    background: $cherry-wine;
    color: white
  }
  .header-image, .absolute-top {
    height: 100%;
    z-index: -1;
    opacity: 1.1;
  }
  .q-item.q-router-link--active, .q-item--active {
    color: #ce9866
  }
  .bottom-header__actions {
    list-style: none;
  }
  .auth-links {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .actions-header_login {
    background: #cfc5ae;
    border: 1px solid #cfc5ae;
    border-radius: 5px;
    height: 30px;
    width: 150px;
  }
  .actions-header_reg {
    background: #ce9866;
    border: 1px solid #ce9866;
    border-radius: 5px;
    height: 30px;
    width: 150px;
  }
  .actions-header_login:hover {
    background: #ce9866;
    border: 1px solid #ce9866;
    cursor: pointer;
    transition-duration: 100ms;
  }
  .actions-header_reg:hover {
    background: #cfc5ae;
    border: 1px solid #ce9866;
    cursor: pointer;
    transition-duration: 100ms;
  }
</style>