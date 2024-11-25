const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar la ruta b�sica para verificar que el servidor est� funcionando
app.get('/', (req, res) => {
  res.send('Servidor WebSocket en ejecuci�n');
});

// Escuchar eventos de conexi�n WebSocket
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  
  // Escuchar mensaje enviado desde el cliente
  socket.on('send_message', (message) => {
    console.log('Mensaje recibido:', message);
    io.emit('receive_message', message);  // Emitir el mensaje a todos los clientes conectados
  });

  // Manejar desconexi�n
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Configurar el puerto
const port = 3001;
server.listen(port, () => {
  console.log(`Servidor WebSocket en ejecuci�n en http://localhost:${port}`);
});
