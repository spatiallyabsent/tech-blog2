const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;



//setting up the view engines and connecting with express
app.engine('handlebars', exphbs({ 
defaultLayout: 'main',
layoutsDir: path.join(__dirname, 'views', 'layouts'),
partialsDir: path.join(__dirname, 'views', 'partials'), // Specify the directory where your partials are located
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   // Render home.handlebars within main.handlebars layout
//   res.render('home');
// });


//setting up the express-session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false,
}));

app.use(routes);

console.log('Path to views directory:', path.join(__dirname, 'views'));

//may want to set force to true when testing out push data
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});