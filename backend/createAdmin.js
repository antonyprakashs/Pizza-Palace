require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    const hashed = await bcrypt.hash('admin123', 12);
    await User.deleteOne({ email: 'Admin@pizza.com' });
    await User.create({
      name: 'Admin',
      email: 'Admin@pizza.com',
      password: hashed,
      role: 'admin'
    });
    console.log('✅ Admin created!');
    console.log('📧 Email: Admin@pizza.com');
    console.log('🔑 Password: admin123');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });