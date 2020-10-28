const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');
// chaining routes- clean code //mounting
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router.route('/:id').get(tourController.getTour);

module.exports = router;