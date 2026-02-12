const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Artwork = require('../models/Artwork');
const { createShipment } = require('../utils/shippingService');
const { sendOrderConfirmation, sendAdminNotification } = require('../utils/emailService');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a new order and Razorpay order
// @route   POST /api/payment/create-order
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const { orderData } = req.body;

    // Validate artwork availability
    for (const item of orderData.items) {
      const artwork = await Artwork.findById(item.artworkId);
      if (!artwork || artwork.stock < item.quantity) {
        return res.status(400).json({ success: false, error: 'Insufficient stock for one or more items.' });
      }
    }

    // Create a pending order in the database
    const newOrder = new Order({
      ...orderData,
      paymentStatus: 'pending',
      paymentMethod: 'razorpay',
    });

    const savedOrder = await newOrder.save();

    const options = {
      amount: savedOrder.totalAmount * 100, // Amount in the smallest currency unit (paise)
      currency: 'INR',
      receipt: savedOrder._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ success: false, error: 'Could not create Razorpay order' });
    }

    res.status(201).json({
      success: true,
      data: {
        razorpayOrder,
        orderId: savedOrder._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay payment and update order
// @route   POST /api/payment/verify-payment
// @access  Public
exports.verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // The ID of the order from our database
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment is successful, update the order
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      order.paymentStatus = 'paid';
      order.paymentId = razorpay_payment_id;

      // Decrement stock
      for (const item of order.items) {
        await Artwork.findByIdAndUpdate(item.artworkId, { $inc: { stock: -item.quantity } });
      }

      const savedOrder = await order.save();

      // Send emails
      try {
        await sendOrderConfirmation(savedOrder);
        await sendAdminNotification(savedOrder);
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
      }

      // Create shipment
      try {
        const shipmentDetails = await createShipment(savedOrder);
        savedOrder.shippingDetails = {
          orderId: shipmentDetails.order_id,
          shipmentId: shipmentDetails.shipment_id,
        };
        savedOrder.shippingStatus = 'created';
        await savedOrder.save();
      } catch (shippingError) {
        console.error('Error creating shipment:', shippingError);
        savedOrder.shippingStatus = 'failed';
        await savedOrder.save();
      }

      res.status(200).json({ success: true, message: 'Payment verified and order updated', data: savedOrder });
    } else {
      res.status(400).json({ success: false, error: 'Invalid payment signature' });
    }
  } catch (error) {
    next(error);
  }
};
