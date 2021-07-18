<template>
  <v-app-bar
      app
      color="#45526C"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Game portal logo"
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="40"
      />
      <h4>Portal de Juegos</h4>
    </div>

    <v-spacer></v-spacer>

    <v-btn
        href="https://github.com/DraCaster"
        target="_blank"
        text
    >
      <span class="mr-2">By DraCaster!</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import logo from '../assets/logoo.png'
export default {
  name: 'nav-bar',
  data: () => ({
    logo:logo
  }),
}
</script>