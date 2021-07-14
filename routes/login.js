const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login
router.post('/', async (req, res) => {

  const { password, email } = req.body;

  console.log(email)

  try {
    const user = await User.findOne({ email });

    if(user == null) {
      return res.status(401).json({ message: 'Invalidate email or name (email - to delete)' })
    }

    res.json(user);
  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

module.exports = router;
