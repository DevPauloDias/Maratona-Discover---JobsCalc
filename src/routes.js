const express= require('express');
const routes= express.Router();

const views= __dirname  + "/views/";

const Profile={

    data: {
        name: "Maik",
        avatar: "https://avatars.githubusercontent.com/u/6643122?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controlers: {
        index(req, res) {
            return res.render( views +"profile", {profile: Profile.data})

        },

        update(req, res) {
            // req.body para pegar os dados
            const data= req.body

            // definir qunatas semanas tem no ano: 52
            const weeksPerYear= 52
            //remover as semanas de férias do ano, para pegar qunatas semanas tem 1 ano
            const weeksPerMonth= (weeksPerYear - data["vacation-per-year"])/12
            //quantas horas por semana estou trabalhando
                const weekTotalHours= data["hours-per-day"] * data["days-per-week"]
            //quantas horas trabalho no mês
                const monthyTotalHours= weeksPerMonth * weekTotalHours;

            const valueHour= data["monthly-budget"] / monthyTotalHours;
            
            Profile.data= {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile');

        }

    }
   

}

const Job= { 

    data: [
        {
            id :  1,
             name: "pizzaria barriga",
             "daily-hours": 5,
             "total-hours": 10,
             created_at: Date.now(), // atribuindo a data de criação,
            
     
         },
         {
             id :  2,
              name: "pizzaria maluco",
              "daily-hours": 5,
              "total-hours": 30,
              created_at: Date.now(), // atribuindo a data de criação
              
      
          }
    ],

    controlers: {
        index(req, res) {         
    
                const updateJobs = Job.data.map((job) => {
                    
                    const remaining = Job.services.remainingDays(job);
                    const status= remaining <=0 ? 'done' : 'progress';
            
                    return {
                        ...job,
                        remaining,
                        status,
                        budget: Job.services.calculateBudget(job, Profile.data["value-hour"])  
            
                    }
                })
            
                return res.render(views + "index", { jobs: updateJobs })
        },
            
        
        create (req,res){
           return res.render(views + "job")
        },

        save(req, res){
            // req.body  { name: 'teste', 'daily-hours': '5', 'total-hours': '20' }
            const lastId= Job.data[Job.data.length -1]?.id || 0;

           Job.data.push({
             id : lastId + 1,
             name: req.body.name,
             "daily-hours": req.body["daily-hours"],
             "total-hours": req.body["total-hours"],
              created_at: Date.now() // atribuindo a data de criação
           });

          return  res.redirect('/'); 
        } ,

        show(req, res)  {

            const jobId= req.params.id

            const job= Job.data.find( job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found')
            }

             job.budget= Job.services.calculateBudget(job, Profile.data["value-hour"])              

            return res.render(views + "job-edit", { job })


            },

            update(req, res){
                const jobId= req.params.id
    
                const job= Job.data.find( job => Number(job.id) === Number(jobId))
    
                if(!job){
                    return res.send('Job not found')
                }
    
                const updatedJob={
                    ...job,
                    name:req.body.name,
                    "total-hours": req.body["total-hours"],
                    "daily-hours": req.body["daily-hours"],
    
                }
    
                Job.data = Job.data.map(job => {
                    if(Number(job.id) === Number(jobId)){
                        job= updatedJob
                    }
                    return job
                })
                res.redirect("/job/"+ jobId)
    
            },
    
            delete(req,res){
                const jobId= req.params.id
                Job.data= Job.data.filter(job => Number(job.id)!== Number(jobId))
    
                return res.redirect("/")
    
            }
            
            
    },

       
        services: {
            remainingDays(job){
                    // ajustes no job
                    // cálculo de tempo restante
            
                    const remainingDays= (job["total-hours"] / job["daily-hours"]).toFixed();
            
                    const createdDate= new Date(job.created_at)
            
                    const dueDay = createdDate.getDate() + Number(remainingDays);
            
                    const  dueDateInMs= createdDate.setDate(dueDay)
                    const timeDiffInms = dueDateInMs - Date.now();
                    //tranformar mili em dias
                    const dayInMs = 1000 * 60 *60 *24
                    const dayDiff = Math.floor(timeDiffInms / dayInMs)
            
                    return dayDiff; // retorna os dias restantes, para acabar o prazo do job
            
            },
    
            calculateBudget: (job, valueHour) => (valueHour * job["total-hours"]).toFixed(2)      
        }
    
    }

    





routes.get("/", Job.controlers.index)
routes.get("/job", Job.controlers.create) // carrega a página para inserir outro job
routes.post("/job", Job.controlers.save) // salva o job inserido

routes.get("/job/:id", Job.controlers.show) // exibindo o job
routes.post("/job/:id", Job.controlers.update) // atualizando um job existente
routes.post("/job/delete/:id", Job.controlers.delete) // deletando um job

routes.get("/profile", Profile.controlers.index )
routes.post("/profile", Profile.controlers.update )



module.exports = routes;