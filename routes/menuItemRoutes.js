const MenuItem = require('../models/menuItem');
const express = require('express');
const router = express.Router();

//POST menu
router.post('/', async (req, res) => {

  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log('Data saved');
    res.status(200).json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//GET menu
router.get('/', async (req, res) => {
	try {
		const menuItems = await MenuItem.find();
		console.log('Data fetched');
		res.status(200).json(menuItems);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});




router.get('/:teste', async(req, res) => {
    try{
     const teste = req.params.teste;
     if(teste == 'sweet' || teste == 'spicy' || teste == 'sour'){
        const response = await MenuItem.find({teste: teste});
        console.log('response fetched');
        res.status(200).json(response);
    
   }else{
       res.status(400).json({ error: 'Invalid teste type' });
   }

    } catch (err) {
     
    console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
    }
  });



//update
router.put('/:id', async (req, res) =>{
try{
  const menuItemId = req.params.id; // get id
  const updatedMenuItemData = req.body; // request find data in db

  const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
    new: true, // return the updated document
    runValidators: true // validate the update against the schema
  });

  if (!response) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  console.log('Data updated');
  res.status(200).json(response);

} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

});

//delete
router.delete('/:id', async (req, res) => {
  try {
  
     const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//test

module.exports = router;