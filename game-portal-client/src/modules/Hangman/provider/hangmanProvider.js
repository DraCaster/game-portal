import axios from 'axios'

class hangmanProvider{

    getNewGame(){
        return new Promise((resolve,reject) => {

            if(!process.env.VUE_APP_APIHOST)
                reject('VUE_APP_APIHOST is required!')

            axios.get(process.env.VUE_APP_APIHOST+'/hangman')
                .then(res => resolve(res.data) )
                .catch(err => reject(err))
        })
    }

    sendLetter(userID, letterSelected){
        return new Promise((resolve,reject) => {
            if(!process.env.VUE_APP_APIHOST)
                reject('VUE_APP_APIHOST is required!')

            axios.post(process.env.VUE_APP_APIHOST+'/hangman',{userID,letterSelected})
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    }

}

export default new hangmanProvider()