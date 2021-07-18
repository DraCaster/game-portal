<template>
  <table class="mx-auto pt-6">
    <tr>
      <td class="board" id="0" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[0].value}}</p>
      </td>
      <td class="board" id="1" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[1].value}}</p>
      </td>
      <td class="board" id="2" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[2].value}}</p>
      </td>
    </tr>
    <tr>
      <td class="board" id="3" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[3].value}}</p>
      </td>
      <td class="board" id="4" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[4].value}}</p>
      </td>
      <td class="board" id="5" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[5].value}}</p>
      </td>
    </tr>
    <tr>
      <td class="board" id="6" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[6].value}}</p>
      </td>
      <td class="board" id="7" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[7].value}}</p>
      </td>
      <td class="board" id="8" v-on:click="checkGame">
        <p class="box display-4 text-center"> {{gameBoard[8].value}}</p>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'TicTacToeTable',
  props: {
    checkGame: {},
    gameBoard: {}
  }
}
</script>
<style scoped>
.board {
  border: solid black;
  width: 100px;
  height: 100px;
  background-color: #adf542;
}

.box {
  margin: 0;

}
</style>