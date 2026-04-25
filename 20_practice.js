const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения:', err));

// Схема и модель
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  age:        { type: Number, required: true },
  created_at: { type: Number, default: () => Math.floor(Date.now() / 1000) },
  updated_at: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});

const User = mongoose.model('User', userSchema);

// POST /api/users
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Не найден' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/:id
app.patch('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Math.floor(Date.now() / 1000) },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'Не найден' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/users/:id
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Не найден' });
    res.json({ message: 'Пользователь удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 http://localhost:3000'));