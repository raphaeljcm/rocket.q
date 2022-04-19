const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'))
});

app.get('/create-pass', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/create-pass.html'))
});

app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/room.html'))
});

app.listen(3000, () => console.log('Server running'));