

const Database = require('./config')

const initDb = {
   
    async init(){

   const db = await Database()
     

         await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            avatar TEXT,
             monthly_budget INT,
            days_per_week INT,
          hours_per_day INT,
          vacation_per_year INT,
          value_hour INT
      )`),

     await db.exec(`CREATE TABLE jobs(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT, 
       daily_hours INT,
         total_hours INT,
            created_at DATETIME
   )`),

     await db.run(`
       INSERT INTO jobs (name, daily_hours,total_hours, created_at )
          VALUES("Pizzaria Guloso",
       6, 
          24, 
          1617514376018)
      `),

   await db.run( `
     INSERT INTO profile (name, 
         avatar, 
         monthly_budget, 
         days_per_week, 
          hours_per_day,
       vacation_per_year,
          value_hour)
   VALUES("Paulo","https://media-exp1.licdn.com/dms/image/D4D35AQFnVRyn3ji4UQ/profile-framedphoto-shrink_200_200/0/1627333796698?e=1643760000&v=beta&t=NwCkY1Vt35d2laRvvmAGAozcjIwChrISKhvIbcCG404", 3500, 5, 6, 4, 50)`)

      await db.close();

 }
};

initDb.init();


