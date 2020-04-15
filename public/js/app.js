const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const name = document.getElementById("name");
const temperature = document.getElementById("temperature");
weatherFrom.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  fetch("/weather?location=" + location).then(response => {
    console.log(response);
    response.json().then(data => {
      name.textContent = data.location;
      temperature.textContent = data.temperature;
      console.log(data.location);
      console.log(data.temperature);
    });
  });
  console.log(location);
});
