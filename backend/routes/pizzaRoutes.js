const express = require('express');
const router = express.Router();

const { getPizzas, createPizza, updatePizza, deletePizza } = require('../controllers/pizzaController');

const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

const { upload } = require('../config/cloudinary');

router.get('/', getPizzas);

router.post('/', verifyToken, isAdmin, upload.single('image'), createPizza);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updatePizza);
router.delete('/:id', verifyToken, isAdmin, deletePizza);

module.exports = router;