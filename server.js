require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connected!'));

app.use(express.json());

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.listen(8000, () => console.log('Server started'));
