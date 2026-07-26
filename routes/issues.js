const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// get latest 6
router.get('/latest-data', async (req, res) => {
  try {
    const data = await Issue.find({}).sort({ date: -1 }).limit(6);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// get all
router.get('/issue', async (req, res) => {
  try {
    const data = await Issue.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// get single
router.get('/issue/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// create
router.post('/issue', async (req, res) => {
  try {
    const result = await Issue.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create issue', error: err.message });
  }
});

// update
router.put('/issue/:id', async (req, res) => {
  try {
    const result = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Issue not found' });
    res.json({ message: 'Updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
});

// delete
router.delete('/issue/:id', async (req, res) => {
  try {
    const result = await Issue.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Issue not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
});

module.exports = router;
