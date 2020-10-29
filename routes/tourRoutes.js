const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');
// chaining routes- clean code //mounting
const router = express.Router();

// router.param('id', tourController.checkID);
// router.param('id', (req, res, next, val) => {
//   console.log(`tour id is ${val}`);
//   next();
// });

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.chechBody, tourController.createTour);
router.route('/:id').get(tourController.getTour);

module.exports = router;
