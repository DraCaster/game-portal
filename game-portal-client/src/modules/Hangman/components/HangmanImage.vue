<template>
  <div class="hangmanImage">
    <v-img :src="item"> </v-img>
  </div>
</template>

<script>
import {hangmanOne,hangmanTwo,hangmanThree,hangmanFour,hangmanFive,
  hangmanSix,hangmanSeven,hangmanEight} from '../../Commons/utils/images'

export default{
  name:"HangmanImage",
  props:{
    value:Number,
  },
  data(){
    return{
      hangmanImages: [
        hangmanOne,
        hangmanTwo,
        hangmanThree,
        hangmanFour,
        hangmanFive,
        hangmanSix,
        hangmanSeven,
        hangmanEight],
    }
  },
  computed:{
    item:{
      get() {
        return this.hangmanImages[this.value]
      }
    }
  }
}
</script>

<style scoped>

.hangmanImage{
  width: 350px;
  height: 300px;
}

</style>