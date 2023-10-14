function getWeatherData(location) {
  let key = "be3bc5872f9442e48b641132230810";

  return fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      return response;
    })
    .catch(console.log);
}

getWeatherData("london");
