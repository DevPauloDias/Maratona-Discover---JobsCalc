const express= require('express');
const routes= express.Router();
const ProfileController= require('./controllers/ProfileController')
const JobController= require('./controllers/JobController')


routes.get("/", JobController.index)
routes.get("/job", JobController.create) // carrega a página para inserir outro job
routes.post("/job", JobController.save) // salva o job inserido

routes.get("/job/:id", JobController.show) // exibindo o job
routes.post("/job/:id", JobController.update) // atualizando um job existente
routes.post("/job/delete/:id", JobController.delete) // deletando um job

routes.get("/profile", ProfileController.index )
routes.post("/profile",ProfileController.update )



module.exports = routes;