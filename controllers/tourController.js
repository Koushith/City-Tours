const express = require('express');
const fs = require('fs');

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello', app: 'test' });
//   console.log(req.url);
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Route handelers

exports.chechBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or Price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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
};
// create tour
exports.createTour = (req, res) => {
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
};
