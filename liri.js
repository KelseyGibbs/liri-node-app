require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


if (!search) {
    search = "spotify-this-song"
};

switch (search) {
    case "concert-this":
        searchBands(userInput);
        break;
    case "spotify-this-song":
        searchSongs(userInput);
        break;
    case "movie-this":
        searchMovies(userInput);
        break;
    case "do-what-it-says":
        searchStuff(userInput);
        break;
}

function searchBands(userInput) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then(
            function (response) {
                console.log("Next Concert Veunue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            })
        .catch(function (error) {
            console.log(error);
        });
}

function searchSongs(userInput) {
    
}

function searchMovies(userInput) {

}
function searchStuff(userInput) {

}