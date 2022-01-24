

 let data= [
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
          
  
      },
];

module.exports= {

    get(){
        return data;
    },

    update(newJob){
        data= newJob;
    },

    delete(jobId){
      data= data.filter(job =>Number(job.id) !== Number(jobId))
    }
}