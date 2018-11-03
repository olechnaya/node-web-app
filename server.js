const express = require('express');
const hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    msg: 'Hello darling',
    currentYear: new Date().getFullYear()
  });
});


app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
