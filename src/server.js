const express= require('express');
const server= express();
const routes=require("./routes");
const path= require('path');

const port= process.env.PORT || 3333;


// Usando template engine

server.set('view engine', 'ejs');

server.set( 'views', path.join(__dirname,  'views'))

// Habilitar arquivos static
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true}))


//server.get("/", (req, res)=> res.render("index"));
 

// routes
server.use(routes);



server.listen(port, () => { console.log("Servidor ativo!")});