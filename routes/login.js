const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

// Login
router.post('/', async (req, res) => {

  const { password, email } = req.body;

  try {
    let user;
    user = await User.findOne({ email }).select("-password");

    if(user == null) {
      return res.status(401).json({ message: 'Invalidate email or name (email - to delete)' })
    }

    user = await User.findOne({ email, password }).select("-password");

    if (user) {
      // create jsonwebtoken and add it to tokens array
      const token = jwt.sign({ email }, process.env.JWT_KEY);

      user.tokens.push(token);
      await user.save();

      return res.status(200).send(user);
    } else {
      return res.status(401).json({ message: 'Invalidate email or name (password - to delete)' })
    }

  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

module.exports = router;
