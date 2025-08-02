// Test simple avec http module
import http from 'http';

const postData = JSON.stringify({
  email: 'samsung@bdtech.com',
  password: 'SamsungPass123!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (res.statusCode === 200 && response.data && response.data.token) {
        console.log('\n✅ Samsung login successful!');
        console.log('User:', response.data.user.firstName, response.data.user.lastName);
      } else {
        console.log('\n❌ Login failed');
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
});

req.write(postData);
req.end(); 