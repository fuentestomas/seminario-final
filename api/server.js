require('dotenv').config();
const { app } = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { ModelMethods: ChatMethods } = require('./modules/chat/methods');
const { ModelMethods: MessageMethods } = require('./modules/message/methods');

// Configuración de la base de datos
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: La variable de entorno MONGODB_URI no está definida.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
  process.exit(1);
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Creación del servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Servidor corriendo en puerto:', PORT);
});

// Configuración de WebSocket
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('socket id', socket.id);

  socket.on('join', (chatId) => {
    socket.join(chatId);
  });

  socket.on('message', async (messageObj) => {
    console.log(`Received message: ${messageObj}`);
    // Creates new chat if not exists
    if (messageObj.chatId === 'none') {
      try {
        const chatMethods = new ChatMethods();
        let newChat = {
          employerId: messageObj.employerId,
          workerId: messageObj.workerId
        };
        newChat = await chatMethods.create(newChat);
        messageObj.chatId = newChat._id.toString();
        console.log('newChatId', messageObj.chatId);
        socket.join(messageObj.chatId);
      } catch (e) {
        console.log('ERROR: ', e);
        return;
      }
    }

    //Add message to DB
    let newMessage;
    try {
      const messageMethods = new MessageMethods();
      newMessage = {
        chatId: messageObj.chatId,
        userId: messageObj.userId,
        text: messageObj.text
      };
      await messageMethods.create(newMessage);
    }
    catch (e) {
      console.log('ERROR:', e);
      return;
    }

    // Emit the new message to the specific room
    io.to(messageObj.chatId).emit('message', { newMessage });
  });
});
