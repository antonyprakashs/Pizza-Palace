require('dotenv').config();
const mongoose = require('mongoose');
const Pizza = require('./models/Pizza');

const pizzas = [
  {
    name: 'Margherita',
    description: 'Classic tomato sauce with fresh mozzarella and basil',
    price: 199,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    isAvailable: true
  },
  {
    name: 'Pepperoni',
    description: 'Loaded with spicy pepperoni and mozzarella cheese',
    price: 299,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    isAvailable: true
  },
  {
    name: 'BBQ Chicken',
    description: 'Smoky BBQ sauce with grilled chicken and onions',
    price: 349,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    isAvailable: true
  },
  {
    name: 'Paneer Tikka',
    description: 'Indian spiced paneer with bell peppers and onions',
    price: 249,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    isAvailable: true
  },
  {
    name: 'Farm House',
    description: 'Fresh vegetables on tangy tomato sauce',
    price: 229,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400',
    isAvailable: true
  },
  {
    name: 'Chicken Supreme',
    description: 'Grilled chicken with mushrooms and black olives',
    price: 329,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    isAvailable: true
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await Pizza.deleteMany();
    await Pizza.insertMany(pizzas);
    console.log('✅ Pizzas seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });