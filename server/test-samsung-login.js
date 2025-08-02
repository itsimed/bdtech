// Test simple pour la connexion Samsung
const API_BASE_URL = 'http://localhost:5000/api';

async function testSamsungLogin() {
  try {
    console.log('🧪 Testing Samsung login...\n');

    // Test de connexion Samsung
    const loginData = {
      email: 'samsung@bdtech.com',
      password: 'SamsungPass123!'
    };

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok && data.data && data.data.token) {
      console.log('\n✅ Samsung login successful!');
      console.log('Token received:', data.data.token.substring(0, 50) + '...');
      console.log('User:', data.data.user.firstName, data.data.user.lastName);
      
      // Test de récupération du profil avec le token
      const profileResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.data.token}`,
          'Content-Type': 'application/json',
        }
      });

      const profileData = await profileResponse.json();
      console.log('\n📋 Profile test:', profileResponse.status === 200 ? '✅ Success' : '❌ Failed');
      
    } else {
      console.log('\n❌ Login failed');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSamsungLogin(); 