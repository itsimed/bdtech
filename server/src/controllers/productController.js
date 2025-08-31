import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all products for the authenticated client
// @route   GET /api/products
// @access  Private
export const getClientProducts = asyncHandler(async (req, res) => {
  const clientId = req.user._id;
  const clientEmail = req.user.email;
  
  const products = await Product.find({
    isActive: true,
    $or: [
      { 'clientPricing.clientId': clientId },
      { 'clientPricing.clientEmail': clientEmail }
    ]
  });
  
  // Ajouter le prix spécifique du client à chaque produit
  const productsWithPricing = products.map(product => {
    const productObj = product.toObject();
    const pricing = product.getPriceForClient(clientId, clientEmail);
    
    // Retirer les informations de pricing des autres clients
    delete productObj.clientPricing;
    
    return {
      ...productObj,
      pricing
    };
  });
  
  res.status(200).json({
    status: 'success',
    count: productsWithPricing.length,
    data: {
      products: productsWithPricing
    }
  });
});

// @desc    Get single product for the authenticated client
// @route   GET /api/products/:id
// @access  Private
export const getClientProduct = asyncHandler(async (req, res) => {
  const clientId = req.user._id;
  const clientEmail = req.user.email;
  
  const product = await Product.findOne({
    _id: req.params.id,
    isActive: true,
    $or: [
      { 'clientPricing.clientId': clientId },
      { 'clientPricing.clientEmail': clientEmail }
    ]
  });
  
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found or not available for this client'
    });
  }
  
  const productObj = product.toObject();
  const pricing = product.getPriceForClient(clientId, clientEmail);
  
  // Retirer les informations de pricing des autres clients
  delete productObj.clientPricing;
  
  res.status(200).json({
    status: 'success',
    data: {
      product: {
        ...productObj,
        pricing
      }
    }
  });
});

// @desc    Search products for the authenticated client
// @route   GET /api/products/search
// @access  Private
export const searchClientProducts = asyncHandler(async (req, res) => {
  const clientId = req.user._id;
  const clientEmail = req.user.email;
  const { q, category, subcategory } = req.query;
  
  let query = {
    isActive: true,
    $or: [
      { 'clientPricing.clientId': clientId },
      { 'clientPricing.clientEmail': clientEmail }
    ]
  };
  
  // Ajouter la recherche textuelle
  if (q) {
    query.$and = query.$and || [];
    query.$and.push({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    });
  }
  
  // Filtrer par catégorie
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }
  
  // Filtrer par sous-catégorie
  if (subcategory) {
    query.subcategory = { $regex: subcategory, $options: 'i' };
  }
  
  const products = await Product.find(query);
  
  const productsWithPricing = products.map(product => {
    const productObj = product.toObject();
    const pricing = product.getPriceForClient(clientId, clientEmail);
    
    // Retirer les informations de pricing des autres clients
    delete productObj.clientPricing;
    
    return {
      ...productObj,
      pricing
    };
  });
  
  res.status(200).json({
    status: 'success',
    count: productsWithPricing.length,
    data: {
      products: productsWithPricing
    }
  });
});

// ADMIN ROUTES

// @desc    Create a new product
// @route   POST /api/products/admin
// @access  Private (Admin only)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  
  res.status(201).json({
    status: 'success',
    message: 'Product created successfully',
    data: {
      product
    }
  });
});

// @desc    Update a product
// @route   PUT /api/products/admin/:id
// @access  Private (Admin only)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    });
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    data: {
      product
    }
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/admin/:id
// @access  Private (Admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    });
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully'
  });
});

// @desc    Set client-specific pricing
// @route   POST /api/products/admin/:id/pricing
// @access  Private (Admin only)
export const setClientPricing = asyncHandler(async (req, res) => {
  const { clientId, clientEmail, price, currency, discountPercentage, validUntil } = req.body;
  
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    });
  }
  
  await product.setClientPrice(clientId, clientEmail, {
    price,
    currency,
    discountPercentage,
    validUntil
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Client pricing updated successfully',
    data: {
      product
    }
  });
});

// @desc    Get all products (Admin view)
// @route   GET /api/products/admin
// @access  Private (Admin only)
export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, isActive } = req.query;
  
  let query = {};
  
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }
  
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }
  
  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const totalProducts = await Product.countDocuments(query);
  
  res.status(200).json({
    status: 'success',
    count: products.length,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    data: {
      products
    }
  });
});
