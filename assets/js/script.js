// insert HTML selectors here 

// add event listener to search button 

$('#country-search').on('submit', function (event) {
    event.preventDefault();
    let inputCountry= $('#country-search').val();
    console.log (inputCountry);
    // searchCountries(chosenCity);
});


// global variables 


// Input Country test 
// let inputCountry = "United Kingdom";

// things to render: 

// name, flag, population, currency, Current Weather : current temperature, icon, temp

// pulling from RestCountries API 

function searchCountries(){
    const queryURLCountry = `https://restcountries.com/v3.1/name/${inputCountry}`;
    fetch(queryURLCountry)
    .then(function(response){
        return response.json();
    }) .then (function(data){
        console.log(data);
})
}

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

