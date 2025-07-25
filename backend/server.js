const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { sequelize, User, Task } = require('./models');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.json({ message: 'User created', userId: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ token });
});

// Tasks - Protected
app.get('/api/tasks', auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { UserId: req.userId } });
  res.json(tasks);
});

app.post('/api/tasks', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, UserId: req.userId });
  res.json(task);
});

app.put('/api/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  await task.update(req.body);
  res.json(task);
});

app.delete('/api/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  await task.destroy();
  res.json({ message: 'Deleted' });
});

// Start server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
