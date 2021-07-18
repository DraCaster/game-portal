import express from 'express'
import {hangmanCheckGameAction, hangmanNewGameAction} from "../controllers/hangmanController";

const router = express.Router();

router.get('/hangman', (req,res) => {
    return hangmanNewGameAction(req,res)
})

router.post('/hangman',(req,res) => {
    return hangmanCheckGameAction(req,res)
})

export default router;