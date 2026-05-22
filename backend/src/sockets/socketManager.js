let ioInstance = null;

const initSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-ticket", (ticketId) => {
      socket.join(`ticket-${ticketId}`);
    });

    socket.on("leave-ticket", (ticketId) => {
      socket.leave(`ticket-${ticketId}`);
    });

    socket.on("join-admin-room", () => {
      socket.join("admin-room");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket not initialized");
  }

  return ioInstance;
};

module.exports = {
  initSocket,
  getIO
};