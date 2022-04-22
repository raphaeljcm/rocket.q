const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Routes
const homeRouter = require('./routes/homeRouter');
const createPassRouter = require('./routes/createPassRouter');
const roomRouter = require('./routes/roomRouter');

app.use('/', homeRouter);
app.use('/create-pass', createPassRouter);
app.use('/room', roomRouter);
app.use(express.static('public'));

app.listen(3000, () => console.log('Server running'));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// DATABASE
mongoose.connect('mongodb://localhost/roquet-q', (err, db) => {
  if(err) {
    console.log(err);
  }

  console.log('Database connected');
});

let db = mongoose.connection;

db.once('open', () => console.log('Database running...'));
db.once('error', () => console.log('Error trying to run the database...'));