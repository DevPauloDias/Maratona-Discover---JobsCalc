const express= require('express');
const server= express();
const routes=require("./routes")

// Habilitar arquivos static
server.use(express.static("public"));


server.get("/", function(req, res){
    res.sendFile(__dirname +"/views/index.html");
})

// routes
server.use(routes);



server.listen(3333, () => { console.log("Servidor ativo!")});