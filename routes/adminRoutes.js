const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentActivity
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

// All routes are protected (admin only)
router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/activity', getRecentActivity);

module.exports = router;
