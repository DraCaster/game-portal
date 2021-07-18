import {createNewUser, deletePlayroom, tictactoeCheckGame} from "../services/tictactoeService";

export const tictactoeWS = io => {

    const tictactoeGameWS = io.of('/tictactoe').on('connection', socket => {

        const { id } = socket.client;

        socket.on('getNickname', (nickName) => {

            let data = createNewUser(nickName, id);
            if(data)
                tictactoeGameWS.emit('newPlayroomGame', data);
        })

        socket.on('checkGame', (dataGame) => {
            let gameData = tictactoeCheckGame(dataGame)
            tictactoeGameWS.emit('updateBoard',gameData)
        })

        socket.on('finishGame',(playroomID) => {
            deletePlayroom(playroomID)
        })

        socket.on('disconnect', () => {

            socket.broadcast.emit('user  disconnected',
                id
            )


        });

    });
}