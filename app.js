const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json);

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello', app: 'test' });
//   console.log(req.url);
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {});

app.listen(3000, () => {
  console.log('APp running on port 3000');
});
