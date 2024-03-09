const jwt = require('jsonwebtoken');

const payload = {
  id: 123,
  name: 'John Doe',
};

const secret = 'secret';

// access token -> 15m/1h/1d,  1d,7d
// refresh token -> 7d, 30d, 365d
// const token = jwt.sign(payload, secret, { expiresIn: '1d' });
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA5OTc5OTEzLCJleHAiOjE3MTAwNjYzMTN9.qeY_4VRg3u-t5Y-FHU9DFnme5PA_6n7TbfBoFnHiWms';

console.log(token);

try {
  const payload = jwt.verify(token, secret);
  console.log(payload);
} catch (e) {
  console.log(e);
}
