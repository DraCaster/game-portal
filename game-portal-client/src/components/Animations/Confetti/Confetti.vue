<template>
  <div id="app">
    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
import Lottie from 'vue-lottie';
import * as animationData from './69030-confetti-full-screen.json';

export default {
  name: 'app',
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      defaultOptions: {animationData: animationData.default},
      animationSpeed: 1
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.play()
    },
    play: function () {
      this.anim.play();
    },

  }
}
</script>

