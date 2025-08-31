// Test des produits Samsung avec prix spécifique
const API_BASE_URL = 'http://localhost:5000/api';

async function testSamsungProducts() {
  try {
    console.log('🧪 Testing Samsung products with specific pricing...\n');

    // 1. Se connecter avec Samsung
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

    if (!loginResponse.ok || !loginResult.data?.token) {
      console.log('❌ Login failed');
      return;
    }

    const token = loginResult.data.token;
    console.log('✅ Samsung login successful!');
    console.log('Token:', token.substring(0, 50) + '...\n');

    // 2. Récupérer tous les produits Samsung
    console.log('📦 Getting Samsung products...');
    const productsResponse = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const productsData = await productsResponse.json();
    console.log('Products API Status:', productsResponse.status);
    console.log('Products Response:', JSON.stringify(productsData, null, 2));

    if (productsResponse.ok && productsData.data?.products) {
      const products = productsData.data.products;
      console.log(`\n✅ Found ${products.length} product(s) for Samsung:`);
      
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   SKU: ${product.sku}`);
        console.log(`   Category: ${product.category}`);
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
        if (product.primaryImage) {
          console.log(`   Image: ${product.primaryImage.url}`);
        }
      });

      // 3. Test d'un produit spécifique
      if (products.length > 0) {
        const firstProduct = products[0];
        console.log(`\n🔍 Testing single product: ${firstProduct._id}`);
        
        const singleProductResponse = await fetch(`${API_BASE_URL}/products/${firstProduct._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const singleProductData = await singleProductResponse.json();
        console.log('Single Product Status:', singleProductResponse.status);
        
        if (singleProductResponse.ok) {
          console.log('✅ Single product retrieved successfully');
          console.log('Product Name:', singleProductData.data.product.name);
          console.log('Samsung Price:', singleProductData.data.product.pricing.price, singleProductData.data.product.pricing.currency);
        } else {
          console.log('❌ Failed to get single product');
          console.log('Error:', singleProductData.message);
        }
      }

    } else {
      console.log('❌ Failed to get products');
      console.log('Error:', productsData.message);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSamsungProducts();
