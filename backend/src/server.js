const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const { initSocket } = require("./sockets/socketManager");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true
  }
});

initSocket(io);

server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});