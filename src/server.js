const express= require('express');
const server= express();


server.get("/", function(req, res){
    res.send("index");


})




server.listen(3333, () => { console.log("Servidor ativo!")});