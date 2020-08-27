const express = require('express');
const ws = require('ws');

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

const server = app.listen(3000, () => {
  console.log('server started');
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});