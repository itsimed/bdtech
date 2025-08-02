// Script de test pour l'API BDTECH Backend
const API_BASE_URL = 'http://localhost:5000/api';

// Fonction pour faire des requêtes HTTP
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    console.log(`\n${options.method || 'GET'} ${url}`);
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { error };
  }
}

// Tests de l'API
async function testAPI() {
  console.log('🧪 Testing BDTECH Backend API...\n');

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  await makeRequest(`${API_BASE_URL}/health`);

  // Test 2: Register User
  console.log('\n2️⃣ Testing User Registration...');
  const registerData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@bdtech.com',
    password: 'TestPass123!',
    phone: '+971501234567',
    company: 'BDTECH Solutions',
    position: 'IT Manager',
    address: {
      street: '123 Test Street',
      city: 'Dubai',
      state: 'Dubai',
      country: 'UAE',
      zipCode: '12345'
    }
  };

  const registerResult = await makeRequest(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(registerData)
  });

  let authToken = null;
  if (registerResult.data && registerResult.data.data && registerResult.data.data.token) {
    authToken = registerResult.data.data.token;
    console.log('✅ Registration successful, token received');
  }

  // Test 3: Login User
  console.log('\n3️⃣ Testing User Login...');
  const loginData = {
    email: 'test@bdtech.com',
    password: 'TestPass123!'
  };

  const loginResult = await makeRequest(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(loginData)
  });

  if (loginResult.data && loginResult.data.data && loginResult.data.data.token) {
    authToken = loginResult.data.data.token;
    console.log('✅ Login successful, token received');
  }

  // Test 4: Get User Profile (with token)
  if (authToken) {
    console.log('\n4️⃣ Testing Get User Profile...');
    await makeRequest(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  // Test 5: Update User Profile
  if (authToken) {
    console.log('\n5️⃣ Testing Update User Profile...');
    const updateData = {
      firstName: 'Updated',
      lastName: 'User',
      phone: '+971509876543',
      company: 'Updated BDTECH Solutions',
      position: 'Senior IT Manager'
    };

    await makeRequest(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updateData)
    });
  }

  // Test 6: Forgot Password
  console.log('\n6️⃣ Testing Forgot Password...');
  await makeRequest(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@bdtech.com'
    })
  });

  console.log('\n✅ API Testing completed!');
}

// Lancer les tests
testAPI().catch(console.error); 