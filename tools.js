const request = require('request');
const mysql = require('mysql');

module.exports = {

// return random image URLs from an API
// @param string keyword - search term
// @param int imageCount - number of random images
// return array of image URLs
	getRandomImages_cb: function (keyword, imageCount, callback) {
	var requestURL = "https://api.unsplash.com/photos/random?query="
			+ keyword
			+ "&count="
			+ imageCount
			+ "&client_id=a2a5c7d96d3e325cb68e20e857258485617a4a0ae8a864dd69657bf56b6ea243&orientation=landscape"
	request(requestURL, function(error, response, body) {
		if (!error) {
			var parsedData = JSON.parse(body);
			// console.log("image URL: ", parsedData["urls"]["regular"]);
			var imageURLs = [];

			for (let i = 0; i < 9; i++) {
				imageURLs.push(parsedData[i].urls.regular);
			}
			// console.log(imageURLs);

			// return imageURLs;
			callback(imageURLs);

		} else {
			console.log("error", error);
		}
	});// request
},

// return random image URLs from an API
// @param string keyword - search term
// @param int imageCount - number of random images
// return array of image URLs
getRandomImages: function (keyword, imageCount) {
	var requestURL = "https://api.unsplash.com/photos/random?query="
			+ keyword
			+ "&count="
			+ imageCount
			+ "&client_id=a2a5c7d96d3e325cb68e20e857258485617a4a0ae8a864dd69657bf56b6ea243&orientation=landscape"

	return new Promise(function(resolve, reject) {
		request(requestURL, function(error, response, body) {
			if (!error) {
				var parsedData = JSON.parse(body);
				// console.log("image URL: ", parsedData["urls"]["regular"]);
				var imageURLs = [];

				for (let i = 0; i < imageCount; i++) {
					imageURLs.push(parsedData[i].urls.regular);
				}
				// console.log(imageURLs);

				// return imageURLs;
				resolve(imageURLs);

			} else {
				console.log("error", error);
			}
		});// request
	});
},

//create Database connection
//return Database connection
createConnection: function(){
	
	var conn = mysql.createConnection({
		host: "us-cdbr-iron-east-02.cleardb.net",
		user: "bec4909ebd438a",
		password: "0b087c71",
		database: "heroku_6e9b70158aa3ec4"
	});
	
	return conn;
}

}