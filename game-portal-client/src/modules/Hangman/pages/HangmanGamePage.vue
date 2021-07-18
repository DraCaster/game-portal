<template>
  <v-container>
    <v-row v-if="this.statusGame === 'Gano'">
      <v-col cols="12">
        <Confetti/>
      </v-col>
    </v-row>
    <v-row class="mx-auto" v-else>
      <v-col sm="6">
        <h1>Ahorcado</h1>
        <v-row>
          <v-col sm="12">
            <h1>{{word}}</h1>
          </v-col>
          <v-col sm="6">
            <v-text-field
                v-model="letter"
                label="Letra"
                maxlength="1"
                required
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-btn color="success"
                   depressed
                   elevation="2"
                   raised
                   :disabled="letter.length === 0"
                   @click="setLetter">
              Enviar
            </v-btn>
          </v-col>
          <v-col sm="12">
            <p class="body-1">Letras ya elegidas: {{lettersSelected.length === 0 ? '-' : ''}} </p>
            <v-row class="flex-row mx-auto">
              <p class="body-1 mr-2" v-for="letter in lettersSelected" :key="letter">{{letter}}</p>
            </v-row>
          </v-col>
          <v-col sm="12">
            <p class="body-1">Intentos restantes: {{lives}} </p>
          </v-col>
          <v-col sm="12">
            <v-btn color="warning"
                   depressed
                   elevation="2"
                   raised
                   to="/">Abandonar</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="6">
        <HangmanImage :value="hangmanImageIndex"/>
      </v-col>
    </v-row>

    <Alert :img-modal="alert.img" :value="alert.openAlert"
    :title-modal="alert.title" :subtitle-modal="alert.description"
    :title-btn-modal="alert.titleBtn" @closed="onCloseModal"/>

  </v-container>
</template>
<script>
import HangmanProvider from "../provider/hangmanProvider";
import HangmanImage from "../components/HangmanImage";
import Alert from "../../Commons/components/Alert";
import Confetti from "../../../components/Animations/Confetti/Confetti";

export default {

  mounted() {
    this.newGame()
  },
  components:{
    HangmanImage,Alert,Confetti
  },
  data() {
    return {
      hangmanImageIndex: 0,
      letter:'',
      word:'',
      userID:'',
      wordLength: '',
      lettersSelected:[],
      statusGame:null,
      alert:{
        openAlert: false,
        title: '',
        description:'',
        img:null,
        titleBtn:''
      },
      lives:null
    }
  },
  methods: {
    newGame() {
      HangmanProvider.getNewGame().then(data => {
        this.userID = data.userID
        this.lives = data.lives
        this.word = this.createLetterStripes(data.word)
      }).catch(err => {
        this.onOpenModal('¡UPS!','¡Ha ocurrido un error inesperado!','Entiendo',0);
        console.error(err)
      })
    },
    createLetterStripes(wordLength) {
      let letterStripes = ''
      for (let i = 0; i < wordLength; i++) {
        letterStripes += '_ '
      }
      return letterStripes
    },
    setLetter() {
      this.letter = this.letter.toLowerCase()
      if (this.previouslySelectedLetter(this.letter)) {
        this.onOpenModal('Letra elegida anteriormente',
            'Por favor, elija otra letra',
            'Entiendo', 1)
      } else {
        this.lettersSelected.push(this.letter)
        HangmanProvider.sendLetter(this.userID, this.letter).then(data => {
          this.statusGame = data.statusGame
          if (data.letterFound) {
            this.word = this.updateWord(data.word)
          } else {
            this.lives --
            this.hangmanImageIndex++
          }
          this.checkIfIsEndGame()

        }).catch(err => console.error(err))
      }
    },
    previouslySelectedLetter(letter){
      return this.lettersSelected.includes(letter)
    },
    updateWord(word){
      let letterStripes = ''
      for (let i = 0; i < word.length; i++) {
        letterStripes += word.charAt(i)+' '
      }
      return letterStripes
    },
    checkIfIsEndGame(){
      switch (this.statusGame){
        case "Gano": this.onOpenModal('¡Ganaste!','¡Bien jugado!','Jugar de nuevo',2); break;
        case "Perdio": this.onOpenModal('¡Perdiste!','¡Que lástima!','Revancha',0); break;
      }
    },
    onOpenModal(title, description, titleBtn, indexImg) {
      this.alert.title = title
      this.alert.description = description
      this.alert.titleBtn = titleBtn
      this.alert.img = indexImg
      this.alert.openAlert = true
    },
     onCloseModal(){
      this.alert.openAlert = false
      if(this.statusGame){
        window.location.reload()
      }
    }
  }
};
</script>
