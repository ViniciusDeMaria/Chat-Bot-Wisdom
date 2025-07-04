import  express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv'; //Importa o dotenv
import cors from 'cors';
dotenv.config(); //Carrega as variáveis de ambiente

const router = express.Router();

const URL = process.env.URL_MESSAGE_STAGE;
const URL_TOKEN = process.env.URL_TOKEN_STAGE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT || 3000;
const CROSS_ORIGIN = process.env.CROSS_ORIGIN;
const URL_WELCOME = process.env.URL_WELCOME;

async function getToken() {

  const requestBody = {
    username: USER,
    password: PASSWORD,
  };

  const response = await axios.post(URL_TOKEN, requestBody, {
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });

  return response.data.access;
}

const app = express();
const server = http.createServer(app);
const sockets = new Server(server, {
  cors: {
    origin: CROSS_ORIGIN, // Origem permitida
    methods: ["GET", "POST"],
  },
}
);
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: CROSS_ORIGIN,
}));

sockets.on('connection', (socket) => {
    const id = socket.id;
    console.log('> Connection socket on Serve with id:', id);

    socket.on('welcome', async (msg) => {
      const room = msg.conversationId;
      socket.join(msg.conversationId);

      const token = await getToken();

      const response = await axios.get(URL_WELCOME, {
          headers: {
            Authorization: `Bearer ${token}`, // Carrego o token.
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        });
      
      const message = response.data.message;
      sockets.to(room).emit('receive-message', { message: message, loading: false, welcome: true });
    });

    socket.on('room-message', async (message) => {
      socket.join(message.conversationId);
    });

    socket.on('disconnect', (sckt) => {
      console.log('Fechando conexão por: ', sckt);

      if (sckt == 'transport close') {
        socket.in(id).disconnectSockets();
      }
    });
});

server.listen(PORT, () => console.log('Servidor Rodando 😊🙌'));

//Api de recebimento da informação.
app.post('/api/v1/gen-ai/receive-message', (req, res) => {
  const message = req.body.message;
  const room = req.body.conversationId;
  sockets.to(room).emit('receive-message', { message: message, loading: false} );
  res.status(200).json({ message: 'ok' });
});

app.post('/api/v1/gen-ai/message', async (req, res) => {
  const room = req.body.conversationId;
  try {
    const token = await getToken();
    //Corpo da requisição
    const requestBody = {
      conversationId: req.body.conversationId,
      interaction: req.body.interaction,
    };
    
    //Realizo a requisição POST à instância da Cloud com o Bearer Token e o retorn do corpo no formato JSON.
    const response = await axios.post(URL, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`, // Carrego o token.
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    sockets.to(room).emit('loading-message', { message: req.body.interaction, loading: true});
    res.status(200).json({ message: 'ok' });
  }
  catch (error)
  {
    console.log(error)
    console.log('Error:', error.data.error);
    res.status(500).json({ message: error.data.error });
  }
});

