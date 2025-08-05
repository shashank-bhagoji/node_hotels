const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menuitems');


//Post route to create a new Menuitems
router.post('/',async (req,res) =>{
  try{
    const data1 = req.body;  //Assuming requesting body contain Menuitem data
    //create new menuitems document using mongose model
    const newMenuItem = new MenuItem(data1);

    //save the new Menuitems to the data base
    const response = await newMenuItem.save();
    console.log("data is saved");
    res.status(201).json({
      message: "Menuitems created successfully",
      data1: response
    });
 }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
 }});

 router.get('/',async(req,res)=>{
  try{
    const data1 = await MenuItem.find();
    console.log("data is fetched")
  res.status(200).json(data1);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server eroor"});
  }
})

router.get('/:tasteType',async(req,res)=>{
  try{
    const tasteType = req.params.tasteType;  //Extract the work type from the URl parameter
    if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
      const response = await MenuItem.find({taste: tasteType});
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
        const menuId = req.params.id;//Extract id from ythe URL Parameter
        const updatedmenuData = req.body ; //Update data for the Person

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedmenuData,{
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
   const menuId = req.params.id;//Extract id from ythe URL Parameter
   
   //Assuming you have person model
   const response = await MenuItem.findByIdAndDelete(menuId);
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
//comment added for testing purpose

module.exports = router;