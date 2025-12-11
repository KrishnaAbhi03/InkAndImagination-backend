const Artwork = require('../models/Artwork');

// @desc    Get all artworks
// @route   GET /api/artworks
// @access  Public
exports.getAllArtworks = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, featured, sort } = req.query;
    
    // Build query
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (featured) {
      query.featured = featured === 'true';
    }
    
    // Execute query
    let artworksQuery = Artwork.find(query);
    
    // Sorting
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      artworksQuery = artworksQuery.sort(sortBy);
    } else {
      artworksQuery = artworksQuery.sort('-createdAt');
    }
    
    const artworks = await artworksQuery;
    
    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get artworks by category
// @route   GET /api/artworks/category/:category
// @access  Public
exports.getArtworksByCategory = async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ category: req.params.category }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: artworks.length,
      category: req.params.category,
      data: artworks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single artwork
// @route   GET /api/artworks/:id
// @access  Public
exports.getArtworkById = async (req, res, next) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: 'Artwork not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: artwork
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new artwork
// @route   POST /api/artworks
// @access  Private (Admin)
exports.createArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Artwork created successfully',
      data: artwork
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update artwork
// @route   PUT /api/artworks/:id
// @access  Private (Admin)
exports.updateArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: 'Artwork not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Artwork updated successfully',
      data: artwork
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete artwork
// @route   DELETE /api/artworks/:id
// @access  Private (Admin)
exports.deleteArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: 'Artwork not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Artwork deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
