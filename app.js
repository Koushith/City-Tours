const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello', app: 'test' });
//   console.log(req.url);
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

// get by param-id

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //converts string to number- we can also use parse int

  // send 404 if the id > length of tours

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((e) => e.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
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
    `${__dirname}/dev-data/data/tours-simple.json`,
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

// update and delete are same- just change the status code and method.

// app.patch('/api/vi/tours/:id', (req, res)=>{
//    if (req.params.id*1 > tours.length) {
//    return res.status(404).json({
//     status: 'Fail',
//        message: 'Invalid ID',
//      });
//    }
//    res.status(200).json({
//      status: 'Success',
//      data: {
//        tour: "<Upadeyd>"
//      },
//  })

app.listen(3000, () => {
  console.log('App started on port 3000');
});
