require("dotenv").config();
var keys = require('./keys');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var command = process.argv[2];
var searchTerm = process.argv[3];

switch (command) {
	case "my-tweets":
		var params = { screen_name: 'jshward', count: 20 };
		client.get('statuses/user_timeline', params, function (error, tweets, response) {
			if (error) {
				console.log(error);
			}
			else if (!error) {
				console.log("\nThese are your last " + (tweets.length) + " tweets: \n");
				for (var i = 0; i < tweets.length; i++) {
					console.log("Tweet # " + (i + 1) + ": " + "\n" + tweets[i].text +
						"\n" + "Created on: " + tweets[i].created_at);
					console.log("--------------------");
				}
			}
		});
		break;
	case "movie-this":
		var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&plot=short&apikey=trilogy";

		// This line is just to help us debug against the actual URL.
		console.log(queryUrl);

		request(queryUrl, function (error, response, body) {

			// If the request is successful
			if (!error && response.statusCode === 200) {

				// Parse the body of the site and recover just the imdbRating
				// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
				console.log("Title: " + JSON.parse(body).Title);
				console.log("\n-----\n");
				console.log("Release Year: " + JSON.parse(body).Year);
				console.log("\n-----\n");
				console.log("IMDB Rates This Movie: " + JSON.parse(body).imdbRating);
				console.log("\n-----\n");
				console.log("Rotten Tomatoes Says: " + JSON.parse(body).Ratings[1].Value);
				console.log("\n-----\n");
				console.log("This Movie was Made in: " + JSON.parse(body).Country);
				console.log("\n-----\n");
				console.log("Language the Movie is in: " + JSON.parse(body).Language);
				console.log("\n-----\n");
				console.log("This is What it's About: " + JSON.parse(body).Plot);
				console.log("\n-----\n");
				console.log("Appearing In This Film Are: " + JSON.parse(body).Actors);
			}
		});
		break;
	case "spotify-this-song":
		//ok so this doesn't work
		//var searchTerm = '"' + searchTerm + '"';
		console.log(searchTerm);

		spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}

			console.log(JSON.parse(data).tracks.items.album.artists.name);
		});
	//case "do-what-it-says"
	default:
		text = "What?"
}


