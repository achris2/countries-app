<<<<<<< HEAD
// global variables 
=======
// Global Variables 
>>>>>>> b61603baf63a4463f86cd35e1f7f9e794c787634

var countryData = {}; 

// HTML selectors here

let cardDiv = $('#card-div');

// add event listener to search Input 
$('#country-search').on('keypress', function (event) {
    if (event.key === "Enter"){
        event.preventDefault();
        let inputCountry= $('#country-search').val();
<<<<<<< HEAD
        console.log (inputCountry);
        searchCountry(inputCountry)
        
=======
        
        // check if input country exists in the data 
        if (!countryData[inputCountry]){
            // if not, creates object for the country 
            countryData[inputCountry] = {};
        }
        
        // triggers this pulls data from the API
        searchCountry(inputCountry);
        searchWeather(inputCountry);
        renderCards(inputCountry);

>>>>>>> b61603baf63a4463f86cd35e1f7f9e794c787634
    }
});

// pulling from RestCountries API 

function searchCountry(inputCountry){
    const queryURLCountry = `https://restcountries.com/v3.1/name/${inputCountry}`;
    fetch(queryURLCountry)
    .then(function(response){
        return response.json();
<<<<<<< HEAD
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
=======
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
>>>>>>> b61603baf63a4463f86cd35e1f7f9e794c787634
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

<<<<<<< HEAD
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
=======
        countryData[inputCountry].date = formattedDate;
        countryData[inputCountry].temperature = tempCelsius;
        countryData[inputCountry].humidity = humidity;
        countryData[inputCountry].weatherIcon = iconURL;


        console.log(countryData);
>>>>>>> b61603baf63a4463f86cd35e1f7f9e794c787634


    });
}

<<<<<<< HEAD
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
=======
function renderCards(inputCountry) {
    // flag, capital, region, population, date, temperature, humidity, weather icon
>>>>>>> b61603baf63a4463f86cd35e1f7f9e794c787634

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