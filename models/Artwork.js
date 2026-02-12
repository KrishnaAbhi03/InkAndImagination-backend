const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide artwork title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide artwork description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify artwork category'],
    enum: [
      'Portraits & People',
      'Animals & Wildlife',
      'Nature & Landscapes',
      'Floral & Botanical Art',
      'Abstract & Creative Art'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please provide artwork price'],
    min: [0, 'Price cannot be negative']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x400?text=Artwork+Image'
  },
  stock: {
    type: Number,
    required: [true, 'Please specify stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 1
  },
  dimensions: {
    length: { type: Number },
    breadth: { type: Number },
    height: { type: Number },
    unit: { type: String, enum: ['inches', 'cm'], default: 'cm' }
  },
  weight: {
    type: Number, // in grams
  },
  medium: {
    type: String,
    enum: ['Oil', 'Acrylic', 'Watercolor', 'Sketch', 'Charcoal', 'Mixed Media', 'Digital'],
    default: 'Sketch'
  },
  featured: {
    type: Boolean,
    default: false
  },
  sold: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
artworkSchema.index({ category: 1, price: 1 });
artworkSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Artwork', artworkSchema);
