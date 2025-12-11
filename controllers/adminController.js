const Order = require('../models/Order');
const Artwork = require('../models/Artwork');
const Contact = require('../models/Contact');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const totalArtworks = await Artwork.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'processing' });
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ status: 'new' });
    
    // Calculate total revenue
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5)
      .populate('items.artworkId');
    
    // Get low stock artworks
    const lowStockArtworks = await Artwork.find({ stock: { $lte: 2 } })
      .sort('stock')
      .limit(5);
    
    // Get category distribution
    const categoryStats = await Artwork.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalArtworks,
          totalOrders,
          pendingOrders,
          totalMessages,
          unreadMessages,
          totalRevenue
        },
        recentOrders,
        lowStockArtworks,
        categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent activity
// @route   GET /api/admin/activity
// @access  Private (Admin)
exports.getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(limit)
      .select('customerName totalAmount orderStatus createdAt');
    
    // Get recent messages
    const recentMessages = await Contact.find()
      .sort('-createdAt')
      .limit(limit)
      .select('name email status createdAt');
    
    // Combine and sort by date
    const activity = [
      ...recentOrders.map(order => ({
        type: 'order',
        data: order,
        timestamp: order.createdAt
      })),
      ...recentMessages.map(message => ({
        type: 'message',
        data: message,
        timestamp: message.createdAt
      }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
    
    res.status(200).json({
      success: true,
      count: activity.length,
      data: activity
    });
  } catch (error) {
    next(error);
  }
};
