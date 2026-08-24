const express = require('express');
const { multiply, divide, testFunc, testFunc3 } = require('./testFunc');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from the server!',
    multiply: multiply(5, 3),
    divide: divide(10, 2),
    result: testFunc(5, 3),
    result3: testFunc3(5, 3)
  });
});

