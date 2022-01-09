const express= require('express');
const server= express();
const routes=require("./routes")


// Usando template engine

server.set('view engine', 'ejs');

// Habilitar arquivos static
server.use(express.static("public"));


//server.get("/", (req, res)=> res.render("index"));
 

// routes
server.use(routes);



server.listen(3333, () => { console.log("Servidor ativo!")});