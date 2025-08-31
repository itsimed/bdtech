// Script pour créer un produit Samsung avec prix spécifique
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Product from './src/models/Product.js';

// Load environment variables
dotenv.config({ path: './config.env' });

const createSamsungProduct = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'bdtech_catalog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Trouver l'utilisateur Samsung
    const samsungUser = await User.findOne({ email: 'samsung@bdtech.com' });
    
    if (!samsungUser) {
      console.log('❌ Samsung user not found. Please run create-samsung-user.js first');
      return;
    }

    console.log('📱 Samsung user found:', samsungUser.fullName);

    // Vérifier si le produit existe déjà
    const existingProduct = await Product.findOne({ sku: 'LAPTOP-DELL-5520' });
    
    if (existingProduct) {
      console.log('⚠️ Product already exists');
      
      // Mettre à jour le prix Samsung si nécessaire
      const existingSamsungPricing = existingProduct.clientPricing.find(
        pricing => pricing.clientEmail === 'samsung@bdtech.com'
      );
      
      if (!existingSamsungPricing) {
        await existingProduct.setClientPrice(
          samsungUser._id,
          'samsung@bdtech.com',
          {
            price: 3200,
            currency: 'AED',
            discountPercentage: 15
          }
        );
        console.log('✅ Samsung pricing added to existing product');
      }
      
      console.log('Product details:', {
        id: existingProduct._id,
        name: existingProduct.name,
        sku: existingProduct.sku,
        samsungPrice: existingProduct.getPriceForClient(samsungUser._id, 'samsung@bdtech.com')
      });
      return;
    }

    // Créer le produit avec prix Samsung
    const product = new Product({
      name: 'Dell Latitude 5520 - Business Laptop',
      description: 'Ordinateur portable professionnel Dell Latitude 5520 avec processeur Intel Core i7, 16GB RAM, SSD 512GB. Parfait pour les environnements d\'entreprise avec sécurité avancée et performance optimale.',
      category: 'Informatique',
      subcategory: 'Ordinateurs Portables',
      brand: 'Dell',
      model: 'Latitude 5520',
      sku: 'LAPTOP-DELL-5520',
      
      images: [{
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Dell Latitude 5520 Business Laptop',
        isPrimary: true
      }, {
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Dell Latitude 5520 Side View',
        isPrimary: false
      }],
      
      defaultPrice: 4000,
      
      specifications: {
        'Processeur': 'Intel Core i7-1165G7',
        'Mémoire RAM': '16 GB DDR4',
        'Stockage': 'SSD 512 GB NVMe',
        'Écran': '15.6" Full HD (1920x1080)',
        'Carte graphique': 'Intel Iris Xe Graphics',
        'Système d\'exploitation': 'Windows 11 Pro',
        'Connectivité': 'Wi-Fi 6, Bluetooth 5.1',
        'Ports': 'USB-C, USB 3.2, HDMI, Ethernet',
        'Batterie': 'Jusqu\'à 8 heures',
        'Poids': '1.79 kg',
        'Garantie': '3 ans sur site'
      },
      
      stock: {
        quantity: 25,
        isAvailable: true,
        warehouse: 'Dubai Main'
      },
      
      dimensions: {
        length: 35.7,
        width: 23.5,
        height: 1.9,
        unit: 'cm'
      },
      
      weight: {
        value: 1.79,
        unit: 'kg'
      },
      
      tags: ['business', 'laptop', 'dell', 'intel', 'professional', 'enterprise'],
      featured: true,
      isActive: true
    });

    // Sauvegarder le produit
    await product.save();
    console.log('✅ Base product created');

    // Ajouter le prix spécifique Samsung
    await product.setClientPrice(
      samsungUser._id,
      'samsung@bdtech.com',
      {
        price: 3200,
        currency: 'AED',
        discountPercentage: 15,
        validFrom: new Date(),
        // validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 an
      }
    );

    console.log('✅ Samsung-specific pricing added!');
    
    const samsungPricing = product.getPriceForClient(samsungUser._id, 'samsung@bdtech.com');
    
    console.log('\n📦 Product created successfully!');
    console.log('Product details:', {
      id: product._id,
      name: product.name,
      sku: product.sku,
      defaultPrice: product.defaultPrice + ' AED',
      samsungPrice: samsungPricing.price + ' AED',
      samsungDiscount: samsungPricing.discount + '%',
      images: product.images.length,
      primaryImage: product.primaryImage?.url
    });

    console.log('\n🔗 API Endpoints to test:');
    console.log('- GET /api/products (avec token Samsung)');
    console.log('- GET /api/products/' + product._id + ' (avec token Samsung)');

  } catch (error) {
    console.error('❌ Error creating Samsung product:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📊 MongoDB connection closed');
  }
};

createSamsungProduct();
