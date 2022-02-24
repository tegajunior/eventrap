<template>
  <v-app>
    <v-app-bar app light flat>
      <div class="d-flex align-center">
        <v-btn color="success" plain to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          Got A Beat<v-icon>mdi-music</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="(link, index) in nav_list_array"
          :key="index"
          color="success"
          plain
          :class="index === active_index ? 'active-link' : ''"
          :to="{ name: link.name }"
        >
          {{ link.label }}
        </v-btn>
      </div>
      <v-app-bar-nav-icon @click="drawer = true" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app style="position: fixed">
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(link, index) in nav_list_array"
            :key="index"
            :to="{ name: link.name }"
            color="success"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    active_index: null,
    nav_list_array: [
      {
        label: 'Beat Makers',
        name: 'beatMakers',
        icon: 'mdi-home'
      },
      {
        label: 'Beat Users',
        name: 'beatUsers',
        icon: 'mdi-group'
      },
      {
        label: 'Pricing',
        name: 'pricing',
        icon: 'mdi-movie-open'
      },
      {
        label: 'About Us',
        name: 'about',
        icon: 'mdi-account-edit'
      },
      {
        label: 'Contact',
        name: 'contact',
        icon: 'mdi-account-edit'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
