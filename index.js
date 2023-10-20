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
    temperature_c: data.current.temp_c,
    temperature_f: data.current.temp_f,
    icon: data.current.condition.icon
  };
}

const locationField = document.querySelector(".location-field");
const conditionField = document.querySelector(".condition-field");
const temperatureField = document.querySelector(".temperature-field");
const iconField = document.querySelector(".icon-field");
const celciusRadioBtn = document.querySelector("[value=celsius]");

function populateFields(data) {
  iconField.style.display = "block";

  locationField.textContent = data.location;
  conditionField.textContent = data.condition;
  iconField.src = data.icon;

  if (celciusRadioBtn.checked) {
      temperatureField.textContent = `${data.temperature_c}°C`;
  } else {
      temperatureField.textContent = `${data.temperature_f}°F`;
  }
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
  temperatureField.textContent = "";
  loader.style.display = "block";
  iconField.style.display = "none";

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
