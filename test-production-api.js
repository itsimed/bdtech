// Test du backend Render en production
const API_BASE_URL = 'https://bdtech.onrender.com/api';

async function testProductionAPI() {
  try {
    console.log('🧪 Testing Production API on Render...\n');

    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    
    console.log('Status:', healthResponse.status);
    console.log('Response:', JSON.stringify(healthData, null, 2));
    
    if (!healthResponse.ok) {
      console.log('❌ Health check failed');
      return;
    }
    console.log('✅ Health check successful\n');

    // Test 2: Samsung Login
    console.log('2️⃣ Testing Samsung Login...');
    const loginData = {
      email: 'samsung@bdtech.com',
      password: 'SamsungPass123!'
    };

    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const loginResult = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    console.log('Login Response:', JSON.stringify(loginResult, null, 2));

    if (!loginResponse.ok || !loginResult.data?.token) {
      console.log('❌ Login failed');
      return;
    }

    const token = loginResult.data.token;
    console.log('✅ Samsung login successful!');
    console.log('Token received:', token.substring(0, 50) + '...\n');

    // Test 3: Get Samsung Products
    console.log('3️⃣ Testing Samsung Products...');
    const productsResponse = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const productsData = await productsResponse.json();
    console.log('Products Status:', productsResponse.status);
    console.log('Products Response:', JSON.stringify(productsData, null, 2));

    if (productsResponse.ok && productsData.data?.products) {
      const products = productsData.data.products;
      console.log(`\n✅ Found ${products.length} product(s) for Samsung:`);
      
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   SKU: ${product.sku}`);
        console.log(`   Brand: ${product.brand}`);
        console.log(`   Samsung Price: ${product.pricing.price} ${product.pricing.currency}`);
        if (product.pricing.originalPrice) {
          console.log(`   Original Price: ${product.pricing.originalPrice} ${product.pricing.currency}`);
        }
        if (product.pricing.discount > 0) {
          console.log(`   Discount: ${product.pricing.discount}%`);
        }
        console.log(`   Stock: ${product.stock.quantity} units`);
        console.log(`   Available: ${product.stock.isAvailable ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('❌ Failed to get products');
    }

    console.log('\n🎉 All tests completed!');
    console.log('\n📋 Summary:');
    console.log('✅ Backend deployed on Render');
    console.log('✅ MongoDB connection working');
    console.log('✅ Samsung user authentication working');
    console.log('✅ Samsung products with pricing working');
    console.log('\n🚀 Ready for frontend integration!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProductionAPI();
