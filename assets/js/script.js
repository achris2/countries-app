// global variables 
let inputCountry = "United Kingdom"; 

// insert HTML selectors here

let cardDiv = $('#card-div');


// add event listener to search button 

$('#country-search').on('submit', function (event) {
    event.preventDefault();
    let inputCountry = $('#country-search').val();
    searchCountry();
});



// Input Country test 
// let inputCountry = "United Kingdom";

// things to render: 

// name



// flag population, currency, Current Weather : current temperature, icon, temp

// pulling from RestCountries API 

function searchCountry(){
    const queryURLCountry = `https://restcountries.com/v3.1/name/${inputCountry}`;
    fetch(queryURLCountry)
    .then(function(response){
        return response.json();
    }) .then (function(data){
        console.log(data);
        // flag
        cardDiv.append(`
                <div class="cardContainer col-lg-3 col-md-3 col-sm-12">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <img class="card-img-top" src="${data[0].flags.png}" alt="Card image cap">
                <h5 class="card-title">${inputCountry}</h5>
                <p class="card-text"><b>Capital: </b>${data[0].capital}</p>
                <p class="card-text"><b>Population: </b>${data[0].population}</p>
                <p class="card-text"><b>Region: </b>${data[0].region}</p>
                <a href="#" class="btn btn-primary">Save to Favourites!</a>
                </div>
            </div>
            </div>
        
        `);
})
}

searchCountry();

// pulling from Open Weather API 

function searchWeather(){
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
})

}


// // pulling from Ninja Country API

// function searchCountry() {

//     // API Key for Ninja Country API 
//     const countryAPIKey = "wOVphqpdVH57kAKnlWEPQw==gGtWQ3HGAglwzBMz";

//     // queryURLCountry 
//     let queryURLCountry = `https://api.api-ninjas.com/v1/country?name=${inputCountry}`;

//     fetch(queryURLCountry, {
//         method: 'GET',
//         headers: {
//             'X-Api-Key': countryAPIKey,
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(error) {
//         console.error('Error fetching country data:', error);
//     });
// }

