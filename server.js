const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//may delete later if we do not use helpers
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
//may delete later if we do not use helpers
const hbs = exphbs.create({ helpers });

//setting up the view engines and connecting with express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//setting up the express-session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(routes);
//may want to set force to true when testing out push data
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});