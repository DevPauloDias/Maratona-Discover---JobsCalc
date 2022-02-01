
const Profile = require('../model/Profile')

module.exports ={
   async index(req, res) {
        return res.render("profile", {profile: await Profile.get()})

    },

   async update(req, res) {
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
        const profile = await Profile.get();
        Profile.update({
            ... profile,
            ...req.body,
            "value-hour": valueHour

        })
           
        

        return res.redirect('/profile');

    }

}