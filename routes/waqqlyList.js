 const waqqlyDAO = require("../models/waqqlyDAO");

 class waqqlyList {
   constructor(waqqlyDAO) {
     this.waqqlyDAO = waqqlyDAO;
   }
   async showWalkers(req, res) {
     let querySpec = {
       query: "SELECT * FROM DogWalker",
       parameters: [

	   ]
     };

     const items = await this.waqqlyDAO.find(querySpec);
     res.render("index", {
       title: "Dog Walkers ",
       tasks: items
     });
   }

   async addWalker(req, res) {
     const item = req.body;

     await this.waqqlyDAO.addItem(item);
     res.redirect("/");
   }

   async completeTask(req, res) {
     const completedTasks = Object.keys(req.body);
     const tasks = [];

     completedTasks.forEach(task => {
       tasks.push(this.taskDao.updateItem(task));
     });

     await Promise.all(tasks);

     res.redirect("/");
   }
 }
 module.exports = waqqlyList;