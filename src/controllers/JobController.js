
const Job = require('../model/job');
const JobUtils= require('../utils/jobUtils')
const Profile= require('../model/Profile')
const DataBase= require('../db/config');
const { Database } = require('sqlite');

  module.exports=  {
   
        
    
    create (req,res){
       return res.render("job")
    },

    async save(req, res){
       
        const newJob= {
          name: req.body.name,
          "total-hours": req.body["total-hours"],
          "daily-hours": req.body["daily-hours"],
          created_at: Date.now()
        };

       await Job.create(newJob); 

      return  res.redirect('/'); 
    } ,

    async show(req, res)  {

      const jobs = await Job.get();
      const profile= await Profile.get();

      const jobId= req.params.id

      const job = jobs.find( job => Number(job.id) === Number(jobId))

      if(!job){
          return res.send('Job not found')
      }

      
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
      

      return res.render("job-edit", { job })

    },

   update(req, res){

            const jobId= req.params.id;
            const upJob= {
              name: req.body.name,
              "total-hours": req.body["total-hours"],
              "daily-hours": req.body["daily-hours"]
            }
          
            Job.update(upJob,jobId);
            res.redirect("/job/"+ jobId)

        
    },



    delete(req,res){
           
            const jobId= req.params.id

           Job.delete(jobId)

            return res.redirect("/")

        }       
        
}   