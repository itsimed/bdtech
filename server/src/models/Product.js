import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Informations de base du produit
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  
  // Images du produit
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Prix spécifiques par client
  clientPricing: [{
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clientEmail: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'AED',
      enum: ['AED', 'USD', 'EUR']
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    validFrom: {
      type: Date,
      default: Date.now
    },
    validUntil: {
      type: Date
    }
  }],
  
  // Prix par défaut (pour les nouveaux clients)
  defaultPrice: {
    type: Number,
    required: true,
    min: [0, 'Default price cannot be negative']
  },
  
  // Spécifications techniques
  specifications: {
    type: Map,
    of: String
  },
  
  // Stock et disponibilité
  stock: {
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    warehouse: String
  },
  
  // Métadonnées
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  
  // Dimensions et poids
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      default: 'cm',
      enum: ['cm', 'inch']
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      default: 'kg',
      enum: ['kg', 'lb']
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour les performances
productSchema.index({ sku: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ 'clientPricing.clientId': 1 });
productSchema.index({ 'clientPricing.clientEmail': 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });

// Virtual pour l'image principale
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0] || null;
});

// Méthode pour obtenir le prix d'un client spécifique
productSchema.methods.getPriceForClient = function(clientId, clientEmail) {
  if (!this.clientPricing || this.clientPricing.length === 0) {
    return {
      price: this.defaultPrice,
      currency: 'AED',
      discount: 0
    };
  }
  
  const clientPricing = this.clientPricing.find(pricing => 
    pricing.clientId.toString() === clientId.toString() || 
    pricing.clientEmail === clientEmail
  );
  
  if (clientPricing) {
    // Vérifier la validité de la période
    const now = new Date();
    if (clientPricing.validUntil && clientPricing.validUntil < now) {
      return this.defaultPrice;
    }
    
    // Appliquer la remise si applicable
    const basePrice = clientPricing.price;
    const discount = clientPricing.discountPercentage || 0;
    const finalPrice = basePrice * (1 - discount / 100);
    
    return {
      price: finalPrice,
      originalPrice: basePrice,
      discount: discount,
      currency: clientPricing.currency
    };
  }
  
  return {
    price: this.defaultPrice,
    currency: 'AED',
    discount: 0
  };
};

// Méthode statique pour trouver les produits d'un client
productSchema.statics.findProductsForClient = function(clientId, clientEmail) {
  return this.find({
    isActive: true,
    $or: [
      { 'clientPricing.clientId': clientId },
      { 'clientPricing.clientEmail': clientEmail }
    ]
  });
};

// Méthode pour ajouter/mettre à jour le prix d'un client
productSchema.methods.setClientPrice = function(clientId, clientEmail, priceData) {
  const existingIndex = this.clientPricing.findIndex(pricing => 
    pricing.clientId.toString() === clientId.toString() || 
    pricing.clientEmail === clientEmail
  );
  
  const newPricing = {
    clientId,
    clientEmail,
    price: priceData.price,
    currency: priceData.currency || 'AED',
    discountPercentage: priceData.discountPercentage || 0,
    validFrom: priceData.validFrom || new Date(),
    validUntil: priceData.validUntil
  };
  
  if (existingIndex >= 0) {
    this.clientPricing[existingIndex] = newPricing;
  } else {
    this.clientPricing.push(newPricing);
  }
  
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

export default Product;
