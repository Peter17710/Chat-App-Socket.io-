import express from 'express';
import { Server } from 'socket.io';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const server = app.listen(PORT, () => console.log(`Server is running on http://localhost:3000`));

const io = new Server(server , {
    cors: "*"
});

io.on('connection', (socket) => {
  console.log('socket connected' , socket.id);

  socket.on('disconnect', () => {
    console.log('socket disconnected' , socket.id);
});

    socket.on("sendMessage" , (data) => {
        io.emit("receiveMessage" , data);
    })

    socket.on("typing" , (data) => {
        socket.broadcast.emit("displayTyping" , data);
    })

    socket.on("removeTyping" , (data) => {
        io.emit("remove" , data);
    })
})