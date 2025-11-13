const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const router = express.Router();

// Create (admin/staff)
router.post('/', auth(['admin','staff']), async (req, res) => {
  try {
    const s = new Student(req.body);
    await s.save();
    res.json(s);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Read all (any authenticated user)
router.get('/', auth(), async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

// Read one
router.get('/:id', auth(), async (req, res) => {
  const s = await Student.findById(req.params.id);
  res.json(s);
});

// Update (admin/staff)
router.put('/:id', auth(['admin','staff']), async (req, res) => {
  const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
});

// Delete (admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
