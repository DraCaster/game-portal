import {hangmanNewGame,hangmanCheckGame} from "../services/hangmanService";

export const hangmanNewGameAction = (req,res) => {

    let data = hangmanNewGame()

    if(data)
        res.status(200).send(data)
    else
        res.status(404).send('Content not found')
}

export const hangmanCheckGameAction = (req,res) => {

    if(!req.body.userID)
        return res.status(400).send('userID is required!')

    if(!req.body.letterSelected)
        return res.status(400).send('letterSelected is required!')

    let data = hangmanCheckGame(req.body.userID, req.body.letterSelected)

    if(data)
        return res.status(200).send(data)
    else
        return res.status(404).send('Player not found')
}