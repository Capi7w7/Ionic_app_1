const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar la ruta básica para verificar que el servidor esté funcionando
app.get('/', (req, res) => {
  res.send('Servidor WebSocket en ejecución');
});

// Escuchar eventos de conexión WebSocket
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  
  // Escuchar mensaje enviado desde el cliente
  socket.on('send_message', (message) => {
    console.log('Mensaje recibido:', message);
    io.emit('receive_message', message);  // Emitir el mensaje a todos los clientes conectados
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Configurar el puerto
const port = 3001;
server.listen(port, () => {
  console.log(`Servidor WebSocket en ejecución en http://localhost:${port}`);
});
