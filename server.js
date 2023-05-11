const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Evento de conexão do WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Evento de mensagem recebida do cliente
  ws.on('message', (message) => {
    // Converter o buffer para texto
    const textMessage = message.toString();
    console.log('Mensagem recebida:', textMessage);

    // Restante do seu código...

    // Enviar comando para todos os clientes conectados, exceto o remetente
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(textMessage);
      }
    });
  });

  // Evento de desconexão do cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket iniciado na porta 8080');
