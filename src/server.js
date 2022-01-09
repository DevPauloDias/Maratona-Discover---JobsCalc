const express= require('express');
const server= express();

// Habilitar arquivos static
server.use(express.static("public"));


server.get("/", function(req, res){
    res.sendFile(__dirname +"/views/index.html");


})




server.listen(3333, () => { console.log("Servidor ativo!")});