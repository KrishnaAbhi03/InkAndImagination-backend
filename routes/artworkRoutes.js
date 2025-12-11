const express = require('express');
const router = express.Router();
const {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworksByCategory
} = require('../controllers/artworkController');
const { protect } = require('../middleware/auth');
const { artworkValidation, validate } = require('../middleware/validator');

// Public routes
router.get('/', getAllArtworks);
router.get('/category/:category', getArtworksByCategory);
router.get('/:id', getArtworkById);

// Protected routes (admin only)
router.post('/', protect, artworkValidation, validate, createArtwork);
router.put('/:id', protect, artworkValidation, validate, updateArtwork);
router.delete('/:id', protect, deleteArtwork);

module.exports = router;
