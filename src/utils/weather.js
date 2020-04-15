const request = require("request");
const getWeather = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=45554943abaccfc0d6eb9e4002ec9e1b&query=" +
    longitude +
    "," +
    latitude;
  request(
    {
      url: url,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the server", undefined);
      } else if (response.body.error) {
        callback("No data available", undefined);
      } else {
        callback(
          undefined,
          "The Current Temperature is " + response.body.current.temperature
        );
      }
    }
  );
};
module.exports = getWeather;
