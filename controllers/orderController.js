const Order = require('../models/Order');
const Artwork = require('../models/Artwork');
const { sendOrderConfirmation, sendAdminNotification } = require('../utils/emailService');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, paymentStatus, sort } = req.query;
    
    let query = {};
    
    if (status) {
      query.orderStatus = status;
    }
    
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    
    let ordersQuery = Order.find(query).populate('items.artworkId');
    
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      ordersQuery = ordersQuery.sort(sortBy);
    } else {
      ordersQuery = ordersQuery.sort('-createdAt');
    }
    
    const orders = await ordersQuery;
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private (Admin)
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.artworkId');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;
    
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('items.artworkId');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
