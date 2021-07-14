const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(req.user)
});

// Create new user
router.post('/', async (req, res) => {
  const { name, password, email } = req.body;

  const user = new User({
    name,
    password,
    email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch ({ message }) {
    res.status(400).json({
      message,
    });
  }
});

// Delete User

router.delete('/:id', getUser, (req, res) => {
  try {
    req.user.remove();
    res.json({ message: 'User was successfully deleted' })
  } catch ({ message }) {
      res.status(500).json({ message });
  }
});

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: 'Cannot find user'
      })
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  };

  req.user = user;
  next();
};

module.exports = router;
