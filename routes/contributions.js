const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');

// create
router.post('/contributions', async (req, res) => {
  try {
    const result = await Contribution.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save', error: err.message });
  }
});

// get all
router.get('/contributions', async (req, res) => {
  try {
    const data = await Contribution.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch', error: err.message });
  }
});

module.exports = router;
