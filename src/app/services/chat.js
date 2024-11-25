const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Escuchar conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Escuchar mensajes enviados desde el cliente
  socket.on('send_message', (message) => {
    console.log('Mensaje recibido:', message);
    
    // Emitir el mensaje a todos los clientes
    io.emit('receive_message', message);
  });

  // Escuchar desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3001, () => {
  console.log('Servidor WebSocket escuchando en http://localhost:3001');
});
