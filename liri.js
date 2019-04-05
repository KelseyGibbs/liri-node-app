require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var queryUrl;
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
    queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then(
            function (response) {
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Next Concert Veunue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city +
                    "\nDate & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            })
        .catch(function (error) {
            console.log(error);
        });
}

function searchSongs(userInput) {
    if (userInput === undefined || null) {
        userInput = "The Sign Ace of Base";
    }
    spotify
        .search({
                type: 'track',
                query: userInput
            },
            function (err, data) {
                if (err) {
                    return console.log("ERROR: " + err);
                } else {
                    for (i = 0; i < data.tracks.items.length && i < 1; i++) {
                        var musicQuery = data.tracks.items[i];
                        console.log("Artist: " + musicQuery.artists[0].name +
                            "\nSong Name: " + musicQuery.name +
                            "\nLink to Song: " + musicQuery.preview_url +
                            "\nAlbum Name: " + musicQuery.album.name)
                    }
                };
            });
}

function searchMovies(userInput) {
    if (userInput === undefined || null) {
        userInput = "Mr.Nobody";
    }




    queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json",
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            
            // for (i = 0; i < movieData.length && i < 1; i++) {
                // console.log("Movie Title: " + movieData.Title +
                //     "\nYear: " + movieData.released +
                //     "\nIMDB Rating: " + movieData.imdbRating +
                //     "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
                //     "\nCountry: " + movieData.Country +
                //     "\nLanguage: " + movieData.Language +
                //     "\nPlot: " + movieData.Plot +
                //     "\nActors: " + movieData.Actors)
            // };
        };
    });
}

function searchStuff(userInput) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        var textArr = data.split(",");
        search = textArr[0];
        userInput = textArr[1];
        searchSongs(userInput);
    });
}