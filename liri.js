require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var queryUrl;
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
var break1 = "\n----------------------------------------------\n";


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
    if (!userInput) {
        userInput = "Pink";
    }
    queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then(
            function (response) {
                var eventDateTime = moment(response.data[0].datetime);
                console.log(break1 
                    + "Next Concert Veunue: " + response.data[0].venue.name +
                    "\nLocation: " + response.data[0].venue.city +
                    "\nDate & Time: " + eventDateTime.format("dddd, MMMM Do YYYY") + 
                    break1);
            })
        .catch(function (error) {
            console.log(error);
        });
}

function searchSongs(userInput) {
    if (!userInput) {
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
                        console.log(break1 +
                            "Artist: " + musicQuery.artists[0].name +
                            "\nSong Name: " + musicQuery.name +
                            "\nLink to Song: " + musicQuery.preview_url +
                            "\nAlbum Name: " + musicQuery.album.name + 
                            break1)
                    }
                };
            });
}

function searchMovies(userInput){
    if (!userInput) {
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                console.log(break1 +
                    "Title: " + response.data.Title +
                    "\nYear: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors: " + response.data.Actors + break1);
            }
        )
        .catch((err) => {
            console.log(err);
        })

};

function searchStuff(userInput) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        var textArr = data.split(",");
        search = textArr[0];
        userInput = textArr[1];
        searchSongs(userInput);
    });
}