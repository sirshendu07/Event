const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// --- API ROUTES ---

// 1. Submit Registration
app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Check Status (Find by Tower, Flat, and Phone)
app.get('/api/check', async (req, res) => {
  const { tower, flat, phone } = req.query;
  try {
    const users = await User.find({ tower, flatNumber: flat, phone });
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));