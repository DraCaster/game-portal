<template >
  <v-container class="background">
    <v-row class="mx-auto"
           max-width="344">
      <v-col cols="12">
        <v-img :src="nyancatImg" height="120"/>
      </v-col>
      <v-col sm="6" v-for="(elem,i) in gameList" :key="i">
        <v-card>
          <v-img
              :src="elem.image"
              height="200px"
          ></v-img>
          <v-card-title>
            {{elem.name}}
          </v-card-title>
          <v-card-subtitle>
            {{elem.description}}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
                color="success"
                depressed
                elevation="2"
                raised
                :to="elem.path"
            >
              JUGAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ahorcado from '../assets/ahorcado.png'
import tateti from '../assets/tateti.png'
import nyancat from '../assets/nyan-cat.gif'

export default {
  name: 'Dashboard',
  data: () => ({
    gameList: [
        {name: 'Ahorcado', description: 'Cantidad de jugadores: 1', path: '/HangmanGame', image: ahorcado},
      {name: 'Ta-Te-Ti', description: 'Cantidad de jugadores: 2', path: '/tictactoe', image: tateti}],
    nyancatImg: nyancat
  }),
};
</script>

<style>
.background{
  background-color: #bfb0ac
}
</style>
