const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const getWeather = require("../src/utils/weather");
const getGeoCode = require("../src/utils/geoCode");
const port = process.env.PORT || 3000;
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, "../public"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "sai"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.location;
  if (!address) {
    return res.send("No location available");
  } else {
    getGeoCode(address, (error, data) => {
      if (error) {
        console.log(error);
      }
      getWeather(data.latitude, data.longitude, (error, dataForecast) => {
        console.log(data.location);
        console.log(dataForecast);
        res.send({
          location: req.query.location,
          temperature: dataForecast
        });
      });
    });
  }
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "sai"
  });
});
app.listen(port, () => {
  console.log("Server Started");
});
