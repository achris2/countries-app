// global variables
// insert HTML selectors here
let cardDiv = $('#card-div');
let saved_fav = $('.inner_data');
// add event listener to search button
$('#country-search').on('keypress', function (event) {
    if(event.key === "Enter"){
        // empties welcome card 
        $("#welcome-card").empty();
        event.preventDefault();
        let inputCountry= $('#country-search').val().trim();
        // console.log (inputCountry);
        // searchCountry(inputCountry)

        // console.log("Input Country:", inputCountry);
        //prevent search twice
        if ($(".card-title").length > 0) {
            let found = false;

            $(".card-title").each(function () {
                console.log("Loop iteration");
                let card_title = $(this).text().trim();
                console.log("Card Title:", card_title);

                if (card_title.toLowerCase() === inputCountry.toLowerCase()) {
                    found = true;
                    console.log("Country found");
                    return false; // Exit loop as country is found
                }
            });

            if (!found) {
                console.log("Searching for country", inputCountry);
                searchCountry(inputCountry);
            }
        } else {
            console.log("No card titles found. Searching for country:", inputCountry);
            searchCountry(inputCountry);
        }
        
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

        if ($(".card-title").length > 0) {
            let found = false;

            $(".card-title").each(function (){
                console.log("loop iterate");
                let card_title = $(this).text().trim();
                // console.log("Card Title:", card_title);

                if (card_title.toLowerCase() === results[0].name.common.toLowerCase()) {
                    found = true;
                    console.log("country found");
                    return false;
                }
            });

            if (!found) {
                searchWeather(inputCountry, data);
            }
        } else {
            searchWeather(inputCountry, data);
        }
})
};

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
            <div class="cardContainer col-lg-3 col-md-4 col-sm-6">
            <div class="card h-100">
            <div class="card-body">
            <img class="card-img-top" src="${data.flag}" alt="Card image cap">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text"><b>Capital: </b>${data.capital}</p>
            <p class="card-text"><b>Population: </b>${data.population}</p>
            <p class="card-text"><b>Region: </b>${data.region}</p>
            <p><b>Weather Today:</b> <img src="${data.icon}">(${data.date})</p>
            <p><b>Current Temperature:</b> ${data.temp} °C</p>
            <p><b>Current Humidity:</b> ${data.humidity}%</p>
            <a href="#" data-id="${data.name}" data-region="${data.region}" data-population="${data.population}" img-data="${data.flag}" data-capital="${data.capital}" img-icon="${data.icon}" nameWith-icon="${data.name} (${data.date})" temprature="${data.temp}" data_humidity="${data.humidity}" class="btn btn-primary save_btn">Save to Favourites!</a>
        </div>
        </div>
        </div>
        `)
    cardDiv.prepend(cardBody.html());
    $(".heading_country").show();
    //     `
    //     <div class="cardContainer col-lg-3 col-md-3 col-sm-12">
    //         <div class="card" style="width: 18rem;">
    //             ${cardBody.html()}
    //         </div>
    //  </div>
    // `);
}


// Save countries in local storage
// Function to check local storage for saved data
function displaySavedData() {
    var savedData = JSON.parse(localStorage.getItem('countryData')) || {};
    
    for (var countryId in savedData) {
        if (savedData.hasOwnProperty(countryId)) {
            var countryData = savedData[countryId].split('-1');

            // console.log(countryData);

            var cardHtml = `
                <div class="cardContainer col-lg-3 col-md-4 col-sm-6">
                    <div class="card h-100">
                        <div class="card-body">
                        <img class="card-img-top" src="${countryData[4]}" alt="Card image cap">
                        <h5 class="card-title">${countryId}</h5>
                        <p class="card-text"><b>Capital: </b>${countryData[2]}</p>
                        <p class="card-text"><b>Population: </b>${countryData[0]}</p>
                        <p class="card-text"><b>Region: </b>${countryData[3]}</p>
                        <p>${countryData[6]} <img src="${countryData[5]}"> </p>
                        <p><b>Temp:</b> ${countryData[7]} °C</p>
                        <p><b>Humidity: </b> ${countryData[8]}%</p>
                        <a href="#" class="fave-btn btn btn-primary already_saved">Added to Favourites!</a>
                        </div>
                    </div>
                </div>`;

        saved_fav.append(cardHtml);
        }
    }
}


$(document).on("click", ".clear_favourites button",function (e) {
  e.preventDefault();
  localStorage.removeItem('countryData');
//   location.reload();

  $(".inner_data").html('');
  $("#saved_fav").hide();
  $(this).parent().hide();
});


// // Call the function when the page is loaded
$(document).ready(function () {
      displaySavedData();
      if (localStorage.getItem('countryData') !== null) {
      	$("#saved_fav > h2").show();
        $(".clear_favourites").show();
      	// $(".upper_card #saved_fav").append("<div class='clear_favourites'><button>Clear Favourites</button></div>")
      }
});

$(document).on("click", ".save_btn",function (e) {
    e.preventDefault();
    data_id = $(this).attr("data-id");
    data_population = $(this).attr("data-population");
    data_capital = $(this).attr("data-capital");
    data_region = $(this).attr("data-region");
    
    img_data = $(this).attr("img-data");
    
    img_icon = $(this).attr("img-icon");
    namewith_icon = $(this).attr("namewith-icon");
    temprature = $(this).attr("temprature");
    // console.log(namewith_icon)
    data_humidity = $(this).attr("data_humidity");

    $(this).text("Saved to Favourites!");
    var savedData = JSON.parse(localStorage.getItem('countryData')) || {};

    savedData[data_id] = data_population +"-1"+ data_population +"-1"+ data_capital +"-1"+ data_region + "-1" + img_data + "-1" + img_icon + "-1" + namewith_icon + "-1" + temprature + "-1" + data_humidity;
        
        var cardHtml = `
            <div class="cardContainer col-lg-3 col-md-4 col-sm-6">
                <div class="card h-100">
                    <div class="card-body">
                    <img class="card-img-top" src="${img_data}" alt="Card image cap">
                    <h5 class="card-title">${data_id}</h5>
                    <p class="card-text"><b>Capital: </b>${data_capital}</p>
                    <p class="card-text"><b>Population: </b>${data_population}</p>
                    <p class="card-text"><b>Region: </b>${data_region}</p>
                    <p>${namewith_icon} <img src="${img_icon}"> </p>
                    <p><b>Temp:</b> ${temprature} °C</p>
                    <p><b>Humidity: </b> ${data_humidity}%</p>
                    <a href="#" class="fave-btn btn btn-primary already_saved">Added to Favourites!</a>
                    </div>
                </div>
            </div>`;

        saved_fav.append(cardHtml);
        $("#saved_fav > h2").show();
        $(".clear_favourites").show();
        $(this).parents(".cardContainer").remove();
        $("#saved_fav").show();

        // Save the updated data back to local storage
        localStorage.setItem('countryData', JSON.stringify(savedData));

});
