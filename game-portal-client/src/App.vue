<template>
  <v-app >
    <nav-bar/>
    <v-main class="background">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "./components/NavBar";

export default {
  name: 'App',
  components: {NavBar},

};
</script>

<style>
.background{
  background-color: #bfb0ac
}
</style>


