// console.log("server file is running");
// // function add(a,b){
// //     return a+b;
// // }
// var addd = (a,b) =>a+b;
// var result = addd(2,78);
// console.log(result)

// function callback(){
//     console.log("now adding is completed");
// }
// const add = function(a,b,callback){
//     var result = a+b;
//     console.log("result :" + result);
//     callback();
// }

// add(3,4,callback);
// var fs = require('fs');
// var os = require('os');
// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','hi'+ user.username +'!\n',()=>{
//     console.log('file is created');
// });
// console.log(os)
// console.log(fs)

// const notes = require('./notes.js')

// var age = notes.age;

// var result = notes.addNumber(age+18,10)
// console.log(age);
// console.log("result id  : = " + result);

// var _ = require('lodash');

// var data = ["person","person",1,2,1,2,'name','age','2'];
// var filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString(true));

// const jsonString = '{"name" : "shashank","age":30,"city": "Belagavi"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert = {
//     name : "allice",
//     age : 25
// }
// const json = JSON.stringify(objectToConvert);
// console.log(json);


// app.get('/chicken',(req,res) =>{
//     res.send("sorry.. sir chicken is not available now")
// })

// app.post('/items',(req,res)=>{
//     res.send("data is saved  ")
// })

const express = require('express');
const app = express();
const db = require('./db'); // MongoDB connection file
require('dotenv').config();

// You can now use express.json() instead of body-parser
app.use(express.json()); // To parse JSON in request body



// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

//Post route to create a new Menuitems
// app.post('/menuitems',async (req,res) =>{
//   try{
//     const data1 = req.body;  //Assuming requesting body contain Menuitem data
//     //create new menuitems document using mongose model
//     const newMenuitems = new Menuitems(data1);

//     //save the new Menuitems to the data base
//     const response = await newMenuitems.save();
//     console.log("data is saved");
//     res.status(201).json({
//       message: "Menuitems created successfully",
//       data1: response
//     });
//  }catch(err){
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//  }});

//  app.get('/menuitems',async(req,res)=>{
//   try{
//     const data1 = await Menuitems.find();
//     console.log("data is fetched")
//   res.status(200).json(data1);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: "Internal server eroor"});
//   }
// })


// POST route to create a new person
// app.post('/person', async (req, res) => {
//   try {
//     const data = req.body; // Assuming the request body contains person data

//     // Check if email already exists
//     const existingPerson = await Person.findOne({ email: data.email });
//     if (existingPerson) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     const newPerson = new Person(data);

//     // Save the new person to the database
//     const response = await newPerson.save();
//     console.log('Data saved');
//     res.status(201).json({
//       message: 'Person created successfully',
//       data: response
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



//Get method to get the person
// app.get('/person',async(req,res)=>{
//   try{
//     const data = await Person.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: "Internal server eroor"});
//   }
// })

// app.get('/person/:workType',async(req,res)=>{
//   try{
//     const workType = req.params.workType;  //Extract the work type from the URl parameter
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//       const response = await Person.find({work: workType});
//       console.log("responce fetched");
//       res.status(200).json(response);
//     }else{
//       res.status(404).json({error: "Invalid work type"});
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: "Internal server error"});
//   }
// })

//Import thre router file
const personRoutes =  require('./routes/PersonRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

const PORT = process.env.PORT || 3000;

// Start servermenuItemRoutes
app.listen(PORT, () => {
  console.log('Server running on port 3000');
});


// app.get('/idli',(req,res)=>{
//     var customised_idli = {
//         name : 'tate_idli',
//         size : '12 cm diameter',
//         is_samber : true,
//         is_chuntney :false
//     }
//     res.send(customised_idli)
// })


