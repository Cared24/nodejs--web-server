const path = require('path');
const express = require("express");


const app = express();
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get('/weather', (req, res) => {
  res.send({
      forecast: 'esik az eső',
      location: 'Szeged'
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});
