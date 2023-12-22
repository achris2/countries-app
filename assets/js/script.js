// global variables
// insert HTML selectors here
let cardDiv = $('#card-div');
// add event listener to search button
$('#country-search').on('keypress', function (event) {
    if(event.key === "Enter"){
        event.preventDefault();
        let inputCountry= $('#country-search').val();
        console.log (inputCountry);
        searchCountry(inputCountry)
    }
});
// Input Country test
// let inputCountry = "United Kingdom";
// things to render:
// name
// flag population, currency, Current Weather : current temperature, icon, temp
// pulling from RestCountries API
function searchCountry(inputCountry){
    const queryURLCountry = `https://restcountries.com/v3.1/name/${inputCountry}`;
    fetch(queryURLCountry)
    .then(function(response){
        return response.json();
    }) .then (function(results){
        console.log(results);
        // flag
        var data = {
            name: results[0].name.common,
            flag: results[0].flags.png,
            capital: results[0].capital,
            population: results[0].population,
            region: results[0].region
        }
        searchWeather(inputCountry, data)
})
}
// pulling from Open Weather API
function searchWeather(inputCountry, data){
    // API Key for Open Weather
    const weatherAPIKey = "fa4695e0608a76d517ec72dbb80b9028";
    // queryURLWeather
    let queryURLWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCountry}&units=&appid=${weatherAPIKey}`;
    // fetch, console log data only
    fetch(queryURLWeather)
    .then(function(response){
        return response.json();
    }) .then (function(results){
        console.log(results);
        let currentTime = new Date(results.list[0].dt * 1000);
        // format Date
        let formattedDate = ('0' + currentTime.getDate()).slice(-2) + ' /' + ('0' + (currentTime.getMonth() + 1)).slice(-2) + ' /' + currentTime.getFullYear();
        //  Temperature
        let tempCelsius = Math.round(results.list[0].main.temp-273.15); Math.round()
        // Humidity
        let humidity = results.list[0].main.humidity;
        console.log(humidity);
        // Icon -         //Icon URL
        // https://openweathermap.org/img/w/' + weather[0].icon + '.png
        let icon = results.list[0].weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/w/' + icon + '.png';
        console.log(icon);
        console.log(iconURL);
        data = {
            ...data,
            date: formattedDate,
            icon: iconURL,
            temp: tempCelsius,
            humidity: humidity
        }
        console.log(data)
        renderCard(data)
        // appends the info on chosen city to main card
        // <div class="WeatherDiv"></div>
        // <a href="#" class="btn btn-primary">Save to Favourites!</a>
})
}
function renderCard(data){
    var cardBody = $('<div>')
    cardBody.addClass('card-body')
    cardBody.append(`
         <img class="card-img-top" src="${data.flag}" alt="Card image cap">
         <h5 class="card-title">${data.name}</h5>
         <p class="card-text"><b>Capital: </b>${data.capital}</p>
         <p class="card-text"><b>Population: </b>${data.population}</p>
         <p class="card-text"><b>Region: </b>${data.region}</p>
         <p>${data.name} (${data.date}) <img src="${data.icon}"> </p>
         <p>Temp: ${data.temp} °C</p>
         <p>Humidity: ${data.temp}%</p>
         <a href="#" class="btn btn-primary">Save to Favourites!</a>
    `)
    cardDiv.append(`
        <div class="cardContainer col-lg-3 col-md-3 col-sm-12">
            <div class="card" style="width: 18rem;">
                ${cardBody.html()}
            </div>
     </div>
    `);
}