const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands()

bands.addBand(new Band( name = "Maneva"))
bands.addBand(new Band( name = "Bon Jovi"))
bands.addBand(new Band( name = "Natirus"))
bands.addBand(new Band( name = "PanteonRococo"))
//Mensajes de sockets
io.on("connection", (client) => {
  console.log("cliente conectado");
  client.emit("active-bands", bands.getBands())
  client.on("disconnect", () => {
    console.log("cliennte desconectado");
  });
  client.on("mensaje", (payload) => {
    console.log("mensaje" + payload);
    io.emit("mensaje", { admin: "nuevo mensaje" });
  });

  client.on("vote-band",( payload) =>{
      bands.voteBand( payload.id )
      io.emit("active-bands", bands.getBands())
  })

  client.on("add-band",( payload ) =>{
      const newBand =  new Band( name = payload.name )
      bands.addBand( newBand )
      io.emit("active-bands", bands.getBands())
  })

  client.on("delete-band",( payload ) =>{
    bands.deleteBand( payload.id )
    io.emit("active-bands", bands.getBands())
})

//   client.on("emitir-mensaje", (payload) => {
//       client.broadcast.emit("nuevo-mensaje", payload)//a todos menos al que lo emitio
//     //   io.emit("nuevo-mensaje", payload)
//   })
});
