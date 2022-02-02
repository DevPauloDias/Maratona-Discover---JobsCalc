

module.exports= {
    
    remainingDays(job) {
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

    calculateBudget: (job, valueHour) => ( valueHour * job["total-hours"]).toFixed(2)   
}