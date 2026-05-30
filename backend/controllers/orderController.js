const Order = require('../models/Order');

exports.placeOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;
    const userId = req.user.id || req.user._id;

    const order = await Order.create({
      customerId: userId,
      items,
      totalAmount,
      deliveryAddress
    });
    
    res.status(201).json({ success: true, order });
  } catch (err) { 
    console.error("Order Error:", err); 
    next(err); 
  }
};
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate('items.pizza')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) { next(err); }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('items.pizza')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const statusToUpdate = req.params.status;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: statusToUpdate },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) { next(err); }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending orders can be cancelled' });
    }
    await order.deleteOne();
    res.json({ success: true, message: 'Order cancelled' });
  } catch (err) { next(err); }
};