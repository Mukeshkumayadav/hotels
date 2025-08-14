const Person = require('../models/Person');
const express = require('express');
const router = express.Router();


//POST person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data); // ✅ Now this will work
    const response = await newPerson.save();
    console.log('Data saved');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//GET person
router.get('/', async (req, res) => {
	try {
		const people = await Person.find();
		console.log('Data fetched');
		res.status(200).json(people);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});



router.get('/:workType', async(req, res) => {
    try{
     const workType = req.params.workType;
     if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
    
   }else{
       res.status(400).json({ error: 'Invalid work type' });
   }

    } catch (err) {
     
    console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// upadte

  router.put('/:id', async (req, res) =>{
    try{

      const personId = req.params.id; // get id
      const updatedPersonData = req.body; // resqust find data in db

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true, // return the updated document
        runValidators: true // validate the update against the schema
      })

      if(!response) {
        return res.status(404).json({ error: 'Person not found' });
      }

      console.log('Data updated');
      res.status(200).json(response);

    } catch (err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  })

  //detele

  router.delete('/:id', async (req, res) => {
    try{
        
       const personId = req.params.id; // get id
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);

       if(!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }

      console.log('Data deleted');
      res.status(200).json({ message: 'Person deleted successfully' });

    }catch(err){

      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  })

module.exports = router;
