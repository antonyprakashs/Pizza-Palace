const express = require('express');
const router = express.Router();

const { getPizzas, createPizza, updatePizza, deletePizza } = require('../controllers/pizzaController');

const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

const { upload } = require('../config/cloudinary');

router.get('/', getPizzas);

router.post('/', verifyToken, isAdmin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error("MULTER/CLOUDINARY ERROR:", err);
      // This sends the exact error message back to your frontend!
      return res.status(500).json({ 
        message: "File upload failed", 
        error: err.message || err 
      });
    }
    next();
  });
}, createPizza);
router.put('/:id', verifyToken, isAdmin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ 
        message: "File upload failed", 
        error: err.message || err 
      });
    }
    next();
  });
}, updatePizza);
router.delete('/:id', verifyToken, isAdmin, deletePizza);

module.exports = router;