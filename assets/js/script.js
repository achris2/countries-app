// Global Variables 

var countryData = {}; 

// HTML selectors here

let cardDiv = $('#card-div');

// add event listener to search Input 
$('#country-search').on('keypress', function (event) {
    if (event.key === "Enter"){
        event.preventDefault();
        let inputCountry= $('#country-search').val();
        
        // check if input country exists in the data 
        if (!countryData[inputCountry]){
            // if not, creates object for the country 
            countryData[inputCountry] = {};
        }
        
        // triggers this pulls data from the API
        searchCountry(inputCountry);
        searchWeather(inputCountry);
        renderCards(inputCountry);

    }
});

// pulling from RestCountries API 

function searchCountry(inputCountry){
    const queryURLCountry = `https://restcountries.com/v3.1/name/${inputCountry}`;
    fetch(queryURLCountry)
    .then(function(response){
        return response.json();
    }) .then (function(data){
        console.log(data);

        // flag, capital and region; 

        let flag = data[0].flags.png; 
        let capital = data[0].capital[0]; 
        let region = data[0].region; 
        let population = data[0].population;

        // store data in the countryData object
        countryData[inputCountry].flag = flag; 
        countryData[inputCountry].capital = capital;
        countryData[inputCountry].region = region; 
        countryData[inputCountry].population = population;

})}

// pulling from Open Weather API 

function searchWeather(inputCountry){
    // API Key for Open Weather 

    const weatherAPIKey = "fa4695e0608a76d517ec72dbb80b9028";

    // queryURLWeather 

    let queryURLWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCountry}&units=&appid=${weatherAPIKey}`;

    // fetch, console log data only 
    fetch(queryURLWeather)
    .then(function(response){
        return response.json();
    }) .then (function(data){
        console.log(data);

        let currentTime = new Date(data.list[0].dt * 1000);

        // format Date 
        let formattedDate = ('0' + currentTime.getDate()).slice(-2) + ' /' + ('0' + (currentTime.getMonth() + 1)).slice(-2) + ' /' + currentTime.getFullYear();
        
        //  Temperature 
        let tempCelsius = Math.round(data.list[0].main.temp-273.15); Math.round()

        // Humidity 

        let humidity = data.list[0].main.humidity;
        console.log(humidity);

        // Icon -         //Icon URL
        // https://openweathermap.org/img/w/' + weather[0].icon + '.png
        let icon = data.list[0].weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/w/' + icon + '.png'; 
        console.log(icon);
        console.log(iconURL);

        countryData[inputCountry].date = formattedDate;
        countryData[inputCountry].temperature = tempCelsius;
        countryData[inputCountry].humidity = humidity;
        countryData[inputCountry].weatherIcon = iconURL;


        console.log(countryData);


    });
}

function renderCards(inputCountry) {
    // flag, capital, region, population, date, temperature, humidity, weather icon

    cardDiv.append(`
     <div class="cardContainer col-lg-3 col-md-3 col-sm-12">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <img class="card-img-top" src="${countryData[inputCountry].flag}" alt="${inputCountry} Flag">

            <h5 class="card-title">${inputCountry}</h5>

            <p class="card-text"><b>Key Information</b>

            <p class="card-text"><b>Capital: </b>${countryData[inputCountry].capital}</p>
            <p class="card-text"><b>Region: </b>${countryData[inputCountry].region}</p>
            <p class="card-text"><b>Population: </b>${countryData[inputCountry].population}</p>

            <p class="card-text"><b>Weather</b></p>
            <p class="card-text"><b>Date: </b>${countryData[inputCountry].date}</p>
            <p class="card-text"><b>Temperature: </b>${countryData[inputCountry].temperature} °C</p>
            <p class="card-text"><b>Humidity: </b>${countryData[inputCountry].humidity}%</p>
            <p class="card-text"><b>Weather Icon: </b><img src="${countryData[inputCountry].weatherIcon}" alt="Weather Icon"></p>
            
            <a href="#" class="btn btn-primary">Save to Favourites!</a>
        </div>
        </div>
        </div>
     `);
        
    }