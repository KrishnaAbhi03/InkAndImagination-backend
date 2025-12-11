const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { orderValidation, validate } = require('../middleware/validator');

// Public route - create order
router.post('/', orderValidation, validate, createOrder);

// Protected routes (admin only)
router.get('/', protect, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
