const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = await Contact.create({
      name,
      email,
      message
    });
    
    // Send notification email to admin
    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the contact submission if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
exports.getAllMessages = async (req, res, next) => {
  try {
    const { status, sort } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    let messagesQuery = Contact.find(query);
    
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      messagesQuery = messagesQuery.sort(sortBy);
    } else {
      messagesQuery = messagesQuery.sort('-createdAt');
    }
    
    const messages = await messagesQuery;
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private (Admin)
exports.getMessageById = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    // Mark as read
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin)
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { status, replied } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (replied !== undefined) updateData.replied = replied;
    
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message status updated successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};
