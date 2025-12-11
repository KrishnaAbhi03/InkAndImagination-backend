const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllMessages,
  getMessageById,
  updateMessageStatus
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactValidation, validate } = require('../middleware/validator');

// Public route - submit contact form
router.post('/', contactValidation, validate, submitContactForm);

// Protected routes (admin only)
router.get('/', protect, getAllMessages);
router.get('/:id', protect, getMessageById);
router.put('/:id/status', protect, updateMessageStatus);

module.exports = router;
