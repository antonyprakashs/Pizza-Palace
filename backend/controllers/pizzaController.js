const Pizza = require('../models/Pizza');

exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json({ success: true, pizzas });
  } catch (error) {
    res.status(500).json({ message: 'Server error loading menu' });
  }
};

exports.createPizza = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    
    const finalImageUrl = req.file 
      ? `http://127.0.0.1:5000/uploads/${req.file.filename}` 
      : imageUrl;

    const newPizza = new Pizza({
      name,
      description,
      price: Number(price),
      category,
      imageUrl: finalImageUrl
    });

    await newPizza.save();
    res.status(201).json({ success: true, pizza: newPizza });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating pizza' });
  }
};

exports.updatePizza = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable } = req.body;
    let updateData = { name, description, price: Number(price), category };

    if (isAvailable !== undefined) {
      updateData.isAvailable = isAvailable;
    }

    if (req.file) {
      updateData.imageUrl = `http://127.0.0.1:5000/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, pizza: updatedPizza });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating pizza' });
  }
};

exports.deletePizza = async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Pizza removed permanently' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting pizza' });
  }
};