

const Database= require('../db/config')

module.exports= {

   async get(){ 

        const db = await Database();
        const jobs = await db.all(`SELECT * FROM jobs;`)   
        db.close();   

        return jobs.map(job =>( {
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
          
        }));
    },

    async update(upJob, jobId){

      const db= await Database();
      db.run(`UPDATE jobs SET
      name= "${upJob.name}",
      total_hours= ${upJob["total-hours"]},
      daily_hours = ${upJob["daily-hours"]}
      WHERE id= ${jobId}`)


      await db.close();
        
    },

    async delete(Id){

      const db= await Database();

      db.run(`DELETE FROM jobs WHERE id= ${Id}`)


      db.close();
    },

    
    
    async create (newJob){

     
        const db = await Database();

        try{
       await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES ("${newJob.name}", 
        ${newJob["daily-hours"]},
        ${newJob["total-hours"]}, 
        ${newJob.created_at})`)

        await db.close();    

      }catch(ex){

        
        console.log("Não foi possível inserir o Job!!")     

       
        
      } 
 
       
      
    }   
}