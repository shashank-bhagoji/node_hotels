const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// POST route to create a new person
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains person data

    // Check if email already exists
    const existingPerson = await Person.findOne({ email: data.email });
    if (existingPerson) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('Data saved');
    res.status(201).json({
      message: 'Person created successfully',
      data: response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//Get method to get the person
router.get('/',async(req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server eroor"});
  }
})


router.get('//:workType',async(req,res)=>{
  try{
    const workType = req.params.workType;  //Extract the work type from the URl parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log("responce fetched");
      res.status(200).json(response);
    }else{
      res.status(404).json({error: "Invalid work type"});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;//Extract id from ythe URL Parameter
        const updatedPersonData = req.body ; //Update data for the Person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, // Return updated Document
            runValidators: true,//Run MOngoose Validator
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
    }
})

router.delete('/:id', async (req,res) =>{
  try{
   const personId = req.params.id;//Extract id from ythe URL Parameter
   
   //Assuming you have person model
   const response = await Person.findByIdAndDelete(personId);
    if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data delete');
        res.status(200).json({message: "Person DataDeleted successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error: " Internal Server error"});
  }
})

module.exports = router;