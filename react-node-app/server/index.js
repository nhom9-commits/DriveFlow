const express = require('express');
const { multiply, divide, testFunc, testFunc3 } = require('./testFunc');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/get', (req, res) => {
  // parameters (query params)
  const param = req.query.id;
  res.json({
    message: 'This is a GET request!',
    param: param || null
  });
});

app.post('/api/post', (req, res) => {
  // parameters (Query: ?id=...)
  const param = req.query.id;
  // body
  const body = req.body;
  // get all headers
  const headers = req.headers;
  // Get a specific header (e.g., 'idheader')
  const idHeader = req.headers['idheader'];

  console.log("all data and Log: ", param, body, headers, idHeader);

  res.json({
    message: 'This is a POST request!',
    param: param || null,
    body: body || {},
    idHeader: idHeader || null
  });
});



