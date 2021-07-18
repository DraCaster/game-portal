<template>
  <v-row>
    <v-col>
      <h1>Ta Te Ti - Jugador: {{playerName}}</h1>
      <h5>Simbolo: {{symbol ? symbol : '-'}}</h5>
    </v-col>
    <v-col v-if="!waitingForGame"><h1>{{titleTurn}}</h1></v-col>
  </v-row>
</template>
<script>
  export default{
    name:'TicTacToeTitle',
    props:{
      symbol:String,
      playerName: String,
      titleTurn: String,
      waitingForGame:Boolean
    }
  }
</script>