<template>
  <v-container>
    <TicTacToeTitle :player-name="playerName"
                    :symbol="mySymbol"
    :title-turn="titleTurn"
    :waiting-for-game="waitingForGame"/>
    <TicTactoeWaitingGame v-if="waitingForGame"/>
    <v-row v-else justify="center">
     <v-col cols="6">
       <v-card>
           <TicTacToeTable :check-game="checkGame" :game-board="gameBoard"/>
         <v-card-actions>
           <v-btn color="warning"
                  depressed
                  elevation="2"
                  raised
                  @click="abandonGame"
                >Abandonar</v-btn>
         </v-card-actions>
       </v-card>
     </v-col>
      <v-col cols="6">
        <v-card>
        <v-card-text class="black--text">Historial</v-card-text>
          <v-card-text v-if="history.length === 0">Aun no hay movimientos.</v-card-text>
          <v-card-text v-else v-for="(data,index) in history" :key="index"> Jugador: {{data.player}} - {{data.game}} </v-card-text>
        </v-card>
      </v-col>
   </v-row>

    <!-- MODAL name-->
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      ><v-card>
        <v-card-title>
          <span class="text-h5">Ingrese su nombre</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-text-field
                    label="Nombre"
                    counter
                    maxlength="10"
                    hint="Solo 10 caracteres"
                    v-model="playerName"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="success"
              @click="saveNickName"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-row>

   <Alert :img-modal="alert.img" :value="alert.open"
          :title-modal="alert.title" :subtitle-modal="alert.description"
          :title-btn-modal="alert.titleBtn" @closed="onCloseModal"/>

  </v-container>
</template>
<script>
import io from "socket.io-client";
import {TicTactoeWaitingGame,TicTacToeTitle,TicTacToeTable} from "../components";
import Alert from "../../Commons/components/Alert";

export default {
  components: {Alert,TicTacToeTable, TicTactoeWaitingGame,TicTacToeTitle},
  mounted(){
    this.connectToWebSocket()
    this.waitingForPlayRoomGame()
    this.updatedGame()
    this.ifPlayerIsDisconnected()
  },
  data(){
    return{
      socket: null,
      playerName:'',
      isMyTurn: false,
      playroomID:null,
      mySymbol:null,
      waitingForGame:true,
      playerTwoName:'',
      idPlayerTwo:'',
      dialog: true,
      gameBoard: [{id:0,isFull:false,value:''},
        {id:1,isFull:false,value:''},
        {id:2,isFull:false,value:''},
        {id:3,isFull:false,value:''},
        {id:4,isFull:false,value:''},
        {id:5,isFull:false,value:''},
        {id:6,isFull:false,value:''},
        {id:7,isFull:false,value:''},
        {id:8,isFull:false,value:''}],
      history:[],
      alert:{
        open: false,
        title: '',
        description:'',
        imgIndex:'',
        titleBtn:''
      },
      isEndGame:false,
      phrases:['ha realizado su jugada','anota con su tactica','se la esta jugando','no piensa perder']
    }
  },
  methods: {
    connectToWebSocket() {
      if(!process.env.VUE_APP_WS_HOST)
        throw new Error('VUE_APP_WS_HOST is required!')
      this.socket = io(process.env.VUE_APP_WS_HOST+'/tictactoe');
    },
    saveNickName(){
      if(this.playerName !== ''){
        this.socket.emit('getNickname',this.playerName)
        this.dialog = false
      }
    },
    waitingForPlayRoomGame(){
      this.socket.on('newPlayroomGame',(data) => {
        this.setMyData(data)
        this.waitingForGame = false
      })
    },
    setMyData(data){
      let myData
      if(data.playerOne.nickname === this.playerName){
        myData = data.playerOne
        this.playerTwoName = data.playerTwo.nickname
        this.idPlayerTwo = data.playerTwo.userID
      }else{
        myData = data.playerTwo
        this.playerTwoName = data.playerOne.nickname
        this.idPlayerTwo = data.playerOne.userID
      }

      this.playroomID = data.playRoom
      this.mySymbol = myData.assignedSymbol
      this.isMyTurn = myData.isEnabledToPlay
    },
    checkGame: function (event) {
      let ok

      if(!this.checkIfIsMyTurn()) {
        ok = false
        this.onOpenModal('UPS!','No es tu turno','Entiendo',1)
      }else ok = true

      if(ok) {
        let dataGame = {
          boxID: event.currentTarget.id,
          playroomID: this.playroomID,
          playerName: this.playerName
        }
        this.socket.emit('checkGame',(dataGame))
      }
    },
    checkIfIsMyTurn(){
      return this.isMyTurn
    },
    updatedGame(){
      this.socket.on('updateBoard',(gameData) => {
        if(!gameData.boxIsFull){
          this.updateHistory(this.isMyTurn)
          this.isMyTurn = !this.isMyTurn
          this.updateBoard(gameData.board)
          this.checkWinner(gameData.match, gameData.winner)
        }else{
          if(this.isMyTurn){
            this.onOpenModal('UPS!','Posición ocupada!','Entiendo',1)
          }
        }
      })
    },
    updateBoard(board){
      this.gameBoard = board
    },
    checkWinner(match, symbol){
      if(match){
        if(symbol == this.mySymbol){
          this.onOpenModal('Fin de juego!','Ganaste! Derrotaste a '+this.playerTwoName,'Volver a jugar',2)
          this.isEndGame = true
        }else{
          this.isEndGame = true
          this.onOpenModal('Fin de juego!','Perdiste! Ganador: '+this.playerTwoName,'Volver a jugar',0)
        }
      }else{
        if(symbol == 'equals'){
          this.onOpenModal('Fin de juego!','Empate!','Volver a jugar',2)
          this.isEndGame = true
        }
      }
    },
    onOpenModal(title, description, titleBtn, indexImg) {
      this.alert.title = title
      this.alert.description = description
      this.alert.titleBtn = titleBtn
      this.alert.img = indexImg
      this.alert.open = true
    },
    onCloseModal(){
      this.alert.open = false
      if(this.isEndGame){
        this.disconnectGame()
        window.location.reload()
      }
    },
    abandonGame(){
      this.disconnectGame()
      this.$router.push({name: 'Home'})
    },
    disconnectGame(){
      this.socket.emit('finishGame',(this.playroomID))
      this.socket.close()
    },
    ifPlayerIsDisconnected(){
      this.socket.on('user  disconnected',(id) => {
        if(this.idPlayerTwo == id){
          this.onOpenModal('Fin de juego!','El jugador '+this.playerTwoName+' se ha desconectado.','Buscar otra partida',0)
          this.isEndGame = true
        }
      })
    },
    updateHistory(myTurn){
     let phrase = this.phrases[Math.floor((Math.random() * (this.phrases.length)))]
      if(myTurn){
        this.history.unshift({player: this.playerName, game: phrase})
      }else{
        this.history.unshift({player: this.playerTwoName,  game:phrase})
      }
    }
  },
  computed:{
    titleTurn: function (){
      return this.isMyTurn ? 'Tu turno' : 'Esperando jugada de '+this.playerTwoName
    }

  }
}
</script>

