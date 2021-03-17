const path = require('path');
const express = require('express');

const app = express();

//settings
app.set('port', process.env.PORT || 80);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//iniciando servidor
const server = app.listen(app.get('port'), () => {
    console.log('Servidor en puerto:', app.get('port'));
});

// web scokets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('New conection', socket.id);

    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);

    })
});



