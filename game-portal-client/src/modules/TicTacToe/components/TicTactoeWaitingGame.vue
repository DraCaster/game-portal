<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">

      <h1>El tablero de habilitara cuando empiece el juego</h1>
      <h2>Esperando que otro jugador se una ...</h2>

        <v-progress-circular
            class="mt-3"
            :size="70"
            :width="7"
            color="purple"
            indeterminate
        ></v-progress-circular>

    </v-col>
  </v-row>
</template>
<script>
export default {
 name:'TicTacToeWaitingGame'
}
</script>