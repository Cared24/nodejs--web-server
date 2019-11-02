const path = require('path');
const express = require("express");


const app = express();
const publicDirectory = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

// ---------------------
// PAGES
// ---------------------
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pónusz Richárd'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Richárd Pónusz'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help',
    helpText: 'I am here to help you, please don\'t resist.'
  })
})

app.get('', (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get('/weather', (req, res) => {
  res.send({
      forecast: 'esik az eső',
      location: 'Szeged'
  });
});

// ---------------------
// SERVER
// ---------------------
app.listen(3000, () => {
  console.log("Server is up on 3000");
});
