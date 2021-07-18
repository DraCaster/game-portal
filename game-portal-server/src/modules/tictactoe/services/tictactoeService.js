import {createRandomID} from "../../commons/commons";

let playrooms = []
let waitingUsers = []

export const createNewUser = (nickname, id) => {

    let newPlayer = {
        nickname,
        userID: id,
        isEnabledToPlay: false,
        assignedSymbol: null
    }

    let playerTwo = checkWaitingUsers()

    if(playerTwo){
        return createPlayRoom(newPlayer, playerTwo)
    }else{
        addToWaitingUsers(newPlayer)
    }
    return null

}

/**
 * Chequea si hay usuarios en espera
 * En caso afirmativo, devuelve el usuario y lo quita de la sala de espera
 */
const checkWaitingUsers = () => {

    let user = waitingUsers[0] ? waitingUsers[0] : null
    if(user){
        waitingUsers.splice(user.userID,1)
    }
    return user
}

/**
 * Agrega el usuario a la lista de espera
 * @param user
 */
const addToWaitingUsers = user => {
    return waitingUsers.push(user)
}

const createPlayRoom = (playerOne, playerTwo) => {

    playerOne.assignedSymbol = 'O'
    playerOne.isEnabledToPlay = true
    playerTwo.assignedSymbol = 'X'
    playerTwo.isEnabledToPlay = false

    let newPlayroom = {
        playroomID: createRandomID(5),
        playerOne,
        playerTwo,
        board:[{id:0,isFull:false,value:''},
            {id:1,isFull:false,value:''},
            {id:2,isFull:false,value:''},
            {id:3,isFull:false,value:''},
            {id:4,isFull:false,value:''},
            {id:5,isFull:false,value:''},
            {id:6,isFull:false,value:''},
            {id:7,isFull:false,value:''},
            {id:8,isFull:false,value:''}]
    }

    playrooms.push(newPlayroom)

    return {playRoom: newPlayroom.playroomID, playerOne,playerTwo}

}

export const tictactoeCheckGame = (dataGame) => {

    let playroom = getPlayRoomData(dataGame.playroomID)
    let symbol = getSymbolAssigned(playroom, dataGame.playerName)

    if(playroom.board[dataGame.boxID].isFull){
        return {board: playroom.board, match: false, winner: null, boxIsFull:true}
    }else{
        playroom.board = updateBoard(playroom.board, dataGame.boxID,symbol)
    }

    if(checkRow(dataGame.boxID,symbol,playroom.board) || checkColumn(playroom.board,symbol) || checkDiagonal(playroom.board,symbol)){
        return {board: playroom.board, match: true, winner: symbol, boxIsFull:false }
    }else{
        if(checkEmpate(playroom.board)){
            return {board: playroom.board, match: false, winner: 'equals',boxIsFull:false }
        }
        return {board: playroom.board, match: false, winner: null,boxIsFull:false }
    }

}


export const deletePlayroom = playroomID => {

    let indexPlayroom = playrooms.findIndex(elem => elem.playroomID === playroomID)
    playrooms.splice(indexPlayroom,1)

}

const getPlayRoomData = (playroomID) => {
    return playrooms.find(elem => (elem.playroomID == playroomID ? elem : null))
}

const getSymbolAssigned = (gameData, nickname) => {

    if(gameData.playerOne.nickname == nickname){
       return gameData.playerOne.assignedSymbol
    }else{
        return gameData.playerTwo.assignedSymbol
    }
}

const updateBoard = (board,id,symbol) => {

    let newBoard = [...board]
    newBoard[id] = {...newBoard[id],isFull: true, value: symbol}
    board = newBoard

    return board
}

const checkRow = (idBox,symbol,board) => {

    let row

    if(idBox >= 0 && idBox <= 2) {
        row = board.slice(0,3)
    }else if(idBox >= 3 && idBox <= 5) {
        row = board.slice(3,6)
    }else {
        row = board.slice(6,9)
    }
    return row.every(elem => elem.value == symbol)

}

const checkColumn = (board,symbol) => {

    if(board[0].value == symbol && board[3].value == symbol && board[6].value == symbol){
        return true
    }

    if(board[1].value == symbol && board[4].value == symbol && board[7].value == symbol){
            return true
    }

    if(board[2].value == symbol && board[5].value == symbol && board[8].value == symbol){
        return true
    }

    return false

}

const checkDiagonal = (board,symbol) => {

    if(board[2].value == symbol && board[4].value == symbol && board[6].value == symbol){
        return true
    }

    if(board[0].value == symbol && board[4].value == symbol && board[8].value == symbol){
        return true
    }

    return false

}

const checkEmpate = (board) => {

    let total = 0

    board.forEach(elem => {
        if(elem.isFull){
            total++
        }
    })

    return total === board.length
}