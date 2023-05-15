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
        <q-scroll-area style="height: calc(100% - 185px); margin-top: 185px; border-right: 1px solid #ddd">

          <q-list padding>
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

          </q-list>
        </q-scroll-area>

      
        
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
import { useQuasar } from "quasar";

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
    color: #df9598;
  }
</style>