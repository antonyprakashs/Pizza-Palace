const express = require('express');
const router = express.Router();
const multer = require('multer');

const { getPizzas, createPizza, updatePizza, deletePizza } = require('../controllers/pizzaController');

const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.get('/', getPizzas);

router.post('/', verifyToken, isAdmin, upload.single('image'), createPizza);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updatePizza);
router.delete('/:id', verifyToken, isAdmin, deletePizza);

module.exports = router;