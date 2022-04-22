const express = require('express');
const app = express();
const path = require('path');

// Routes
const routes = require('./routes');

app.use(express.static('public'));

app.use(routes);

app.listen(3000, () => console.log('Server running'));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));