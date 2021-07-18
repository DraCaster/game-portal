<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
          v-model="value"
          persistent
          max-width="350px"
      ><v-card class="mx-auto">
        <v-card-title class="text-h5 grey lighten-2">
          {{titleModal}}
        </v-card-title>
        <v-card-text class="text-center">
          <p class="body-1 black--text mt-2">{{subtitleModal}}</p>
          <v-img :src="emojisImg[imgModal]" width="150" class="mx-auto"/>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              color="success"
              depressed
              elevation="2"
              raised
              @click="onCloseAlert"
          >
            {{titleBtnModal}}
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>

import {sadImg,thinkingImg,happyImg} from '../utils/images'

export default{
  name:"Alert",
  props:{
    value: Boolean,
    titleModal: String,
    subtitleModal: String,
    titleBtnModal:String,
    imgModal:Number,
  },
  data(){
    return{
      emojisImg:[sadImg,thinkingImg,happyImg],
    }
  },
  methods:{
    onCloseAlert(){
      this.$emit('closed')
      this.$emit('input',false)
    }
  }
}
</script>