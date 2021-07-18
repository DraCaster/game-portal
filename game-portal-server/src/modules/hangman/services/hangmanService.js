import {createRandomID} from "../../commons/commons";

const WORDS = ['barco','pokemon','poeta','cristalizacion','javascript']
let users = []

/*Hangman new game service */

/**
 * @description Genera una nueva partida.
 * @return {{userID, word: number}}
 */
export const hangmanNewGame = () => {

    let wordSelected = getWord()

    let hangmanGameData = {userID: createRandomID(),
        wordSelected: wordSelected,
        wordLength: wordSelected.length,
        lives: 7,
        wordGame:createLetterStripes(wordSelected.length),
        numberOfHits: 0
    }

    users.push(hangmanGameData);

    return {userID: hangmanGameData.userID,
    word: wordSelected.length,
        lives: hangmanGameData.lives
    }
}

/**
 * @description Renorna una palabra aleatoria.
 * @return {string}
 */
const getWord = () => {

    let word =  Math.floor((Math.random() * (WORDS.length)));
    return WORDS[word]
}

/**
 * @description Retorna una cadena que contiene tantas rayitas como la longitud de la palabra a usar en el juego.
 * @param {int} wordLength
 * @return {string}
 */
const createLetterStripes = (wordLength) => {

    let letterStripes =''
    for(let i=0; i < wordLength; i++){
        letterStripes += '_'
    }
    return letterStripes

}


/*Hangman check game service */

export const hangmanCheckGame = (userID,letterSelected) => {

    try{

        let userData = getUser(userID)

        let asserts = checkHits(userData, letterSelected)

        userData.numberOfHits += asserts

        if(asserts > 0){
            if(userData.numberOfHits === userData.wordLength){
                return {letterFound: true, word: userData.wordGame, statusGame: 'Gano', lives: userData.lives}
            }
            return {letterFound: true, word:userData.wordGame, statusGame: null, lives: userData.lives}
        }else{
            userData.lives --
            if(userData.lives > 0){
                updateUserData(userID,userData.lives)
            }else{
                deleteUser(userID)
                return{letterFound: false, statusGame: 'Perdio'}
            }
            return{letterFound: false, statusGame: null, lives: userData.lives}
        }
    }catch(error){
       return null
    }
}

const getUser = (userID) => {
    return users.find(elem => elem.userID === userID)
}

const setCharAt = (str,index,chr) => {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

const checkHits = (userData, letterSelected) => {

    let asserts = 0
    for (let i= 0; i < userData.wordLength; i++){
        if(userData.wordSelected[i] === letterSelected){
            asserts++
            userData.wordGame = setCharAt(userData.wordGame,i,letterSelected);
        }
    }
    return asserts
}

const updateUserData = (userID, lives) => {

    let index = users.findIndex(elem => elem.userID === userID)

    if(index !== -1){
        let updateItems = [...users]
        updateItems[index] = {...updateItems[index],lives}
        users = updateItems
        return users
    }else{
        return false
    }
}

const deleteUser = userID => {

    let itemToRemove = users.find(elem => (elem.userID === userID ? elem : null))
    if(itemToRemove){
        users.splice(userID,1)
        return true
    }else
        return false
}
