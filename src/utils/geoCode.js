const request = require("request");
const getGeoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2Fpa3Jpc2huYW1pdHRhcGFsbGUiLCJhIjoiY2s4eXJmZHQ3MDN4YTNnbzJmNXZ1dWtzdCJ9.3_pP1oEE3RMsX5wEp8fPPw";
  request(
    {
      url: url,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the server", undefined);
      } else if (response.body.features.length === 0) {
        callback("No data available", undefined);
      } else {
        callback(undefined, {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name
        });
      }
    }
  );
};
module.exports = getGeoCode;
