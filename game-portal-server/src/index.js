require('dotenv').config();
import express from "express";
const PORT = process.env.API_PORT ? process.env.API_PORT : 3000
import bodyParser from "body-parser";
import corsMiddleware from "./modules/middleware/corsMiddleware";
import hangmanRoutes from './modules/hangman/routes/hangmanRoutes'
import {tictactoeWS} from "./modules/tictactoe/controllers/tictactoeController";

const app = express()

//CORS Middleware
app.use(corsMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Routes
app.use('/',hangmanRoutes)

const httpServer = require("http").Server(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});

//TicTacToe Websocket
tictactoeWS(io)

httpServer.listen(PORT, () => console.log('Escuchando puerto: '+PORT))
