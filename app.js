const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

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

app.post('/api/v1/tours', (req, res) => {
  //console.log(req);
  // console.log(req.body);
  // figure out the id for new obj, ususlly this is taken care of database.
  // this will find the lendth of all id. and in the end it will add 1- eg: len -9, new id= 9+1 10. post-we are creating
  const newId = tours[tours.length - 1].id + 1;

  // assign the new id along with the bodt to the data
  const newTour = Object.assign({ id: newId }, req.body);

  // push this to the tours data
  tours.push(newTour);

  // write to tours- before we were only reading- this will be a js object- convert it to json (Overrides)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'written successfuly',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(3000, () => {
  console.log('APp running on port 3000');
});
