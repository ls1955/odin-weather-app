function getWeatherData(location) {
  let key = "be3bc5872f9442e48b641132230810";

  return fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      return response;
  });
}

function processedWeatherData(data) {
  return {
    location: data.location.name,
    condition: data.current.condition.text,
    temperature_in_celcius: data.current.temp_c,
    temperature_in_fahrenheit: data.current.temp_f,
  };
}

const locationField = document.querySelector(".location-field");
const conditionField = document.querySelector(".condition-field");
const tempCField = document.querySelector(".temperature-celcius-field");
const tempFField = document.querySelector(".temperature-fahrenheit-field");

function populateFields(data) {
  locationField.textContent = `Location: ${data.location}`;
  conditionField.textContent = `Condition: ${data.condition}`;
  tempCField.textContent = `Temperature(celcius): ${data.temperature_in_celcius}°C`;
  tempFField.textContent = `Temperature(fahrenheit): ${data.temperature_in_fahrenheit}°F`;
}

const input = document.querySelector("input");
const confirmButton = document.querySelector("button");
const errMessageBox = document.querySelector(".error-message-box");
const loader = document.querySelector(".loader");

confirmButton.addEventListener("click", async (e) => {
  e.preventDefault();
  errMessageBox.textContent = "";
  locationField.textContent = "";
  conditionField.textContent = "";
  tempCField.textContent = "";
  tempFField.textContent = "";
  loader.style.display = "block";

  try {
    const location = input.value;
    const response = await getWeatherData(location);
    const data = await response.json();

    populateFields(processedWeatherData(data));
  } catch (err) {
    errMessageBox.textContent = err;
  } finally {
    loader.style.display = "none";
  }
});
