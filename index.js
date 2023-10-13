function getWeatherData(location) {
    let key = "be3bc5872f9442e48b641132230810"

    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
        .then(response => response.json())
        .then(console.log)
        .catch(console.log)
}

getWeatherData("london")
