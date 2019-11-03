const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

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
    title: "Időjárás alkalmazás",
    name: "Pónusz Richárd"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Rólam",
    name: "Pónusz Richárd"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Kötelező címet megadnia"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "Kötezelő keresési paramétert megadnia!"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Segítség",
    helpText: "Azért jöttem hogy segítsek. Kérem ne álljon ellen.",
    name: "Pónusz Richárd"
  });
});

app.get("", (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Rólam",
    name: "Pónusz Richárd",
    errorMessage: "404 - nem található"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Rólam",
    name: "Pónusz Richárd",
    errorMessage: "Oldal nem található"
  });
});

// ---------------------
// SERVER
// ---------------------
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});


