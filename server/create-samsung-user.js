// Script pour créer l'utilisateur Samsung
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

// Load environment variables
dotenv.config({ path: './config.env' });

const createSamsungUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'bdtech_catalog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Check if Samsung user already exists
    const existingUser = await User.findOne({ email: 'samsung@bdtech.com' });
    
    if (existingUser) {
      console.log('⚠️ Samsung user already exists');
      console.log('User details:', {
        id: existingUser._id,
        name: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
        isActive: existingUser.isActive
      });
      return;
    }

    // Create Samsung user
    const samsungUser = new User({
      firstName: 'Samsung',
      lastName: 'Electronics',
      email: 'samsung@bdtech.com',
      password: 'SamsungPass123!',
      phone: '+971501234567',
      company: 'Samsung Electronics',
      position: 'IT Director',
      address: {
        street: 'Samsung Building',
        city: 'Dubai',
        state: 'Dubai',
        country: 'UAE',
        zipCode: '12345'
      },
      role: 'client',
      isEmailVerified: true,
      preferences: {
        newsletter: true,
        notifications: true,
        language: 'en'
      }
    });

    await samsungUser.save();

    console.log('✅ Samsung user created successfully!');
    console.log('User details:', {
      id: samsungUser._id,
      name: samsungUser.fullName,
      email: samsungUser.email,
      role: samsungUser.role,
      isActive: samsungUser.isActive
    });

    console.log('\n📋 Login credentials:');
    console.log('Email: samsung@bdtech.com');
    console.log('Password: SamsungPass123!');

  } catch (error) {
    console.error('❌ Error creating Samsung user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📊 MongoDB connection closed');
  }
};

createSamsungUser(); 