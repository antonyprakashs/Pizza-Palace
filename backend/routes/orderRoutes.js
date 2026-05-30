const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getMyOrders);
router.get('/:id/status/:status', verifyToken, isAdmin, updateOrderStatus);
router.delete('/:id', verifyToken, cancelOrder);
router.get('/', verifyToken, isAdmin, getAllOrders);

module.exports = router;