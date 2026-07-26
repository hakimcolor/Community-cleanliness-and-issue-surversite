const express = require('express');
const router = express.Router();
const MyIssue = require('../models/MyIssue');

// get all
router.get('/allmyissues', async (req, res) => {
  try {
    const data = await MyIssue.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// get single
router.get('/allmyissues/:id', async (req, res) => {
  try {
    const result = await MyIssue.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// create
router.post('/myissue', async (req, res) => {
  try {
    const result = await MyIssue.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create', error: err.message });
  }
});

// update
router.put('/myissues/:id', async (req, res) => {
  try {
    const result = await MyIssue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
});

// delete
router.delete('/myissues/:id', async (req, res) => {
  try {
    const result = await MyIssue.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
});

module.exports = router;
