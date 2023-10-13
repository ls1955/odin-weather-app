function getWeatherData(location) {
    let key = "be3bc5872f9442e48b641132230810"
    let result = null

    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(console.log)

    return result
}

getWeatherData("london")
