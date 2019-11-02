const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewPaths = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPaths);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// ---------------------
// PAGES
// ---------------------
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pónusz Richárd"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Pónusz Richárd"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "I am here to help you, please don't resist.",
    name: "Pónusz Richárd"
  });
});

app.get("", (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It's raining",
    location: "Szeged"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "About me",
    name: "Pónusz Richárd",
    errorMessage: 'Help article not found',
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "About me",
    name: "Pónusz Richárd",
    errorMessage: 'Page not found'
  });
});

// ---------------------
// SERVER
// ---------------------
app.listen(3000, () => {
  console.log("Server is up on 3000");
});
