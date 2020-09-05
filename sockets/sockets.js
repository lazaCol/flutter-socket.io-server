const {io} = require('../index')
//Mensajes de sockets
io.on("connection", (client) => {
  console.log("cliente conectado");
  client.on("disconnect", () => {
    console.log("cliennte desconectado");
  });
  client.on("mensaje", (payload) => {
    console.log("mensaje" + payload);
    io.emit("mensaje", { admin: "nuevo mensaje" });
  });
});
