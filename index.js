function getWeatherData(location) {
  let key = "be3bc5872f9442e48b641132230810";

  return fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      return response;
    })
    .catch(console.log);
}

async function processedWeatherData(location) {
    let response = await getWeatherData(location);
    let data = await response.json();

    return {
        location: data.location.name,
        condition: data.current.condition.text,
        temperature_in_celcius: data.current.temp_c,
        temperature_in_fahrenheit: data.current.temp_f
    }
}

console.log(processedWeatherData("london"))
