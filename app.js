//api.openweathermap.org/data/2.5/find?q=London&units=metric
//7ba439e058ac3226a034c071f71e4f50

const https = require('https');
const http = require('http');
const key = require("./key.json");
const readline = require('readline');
var username;

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userNamePromise =  new Promise(function(resolve,reject){
  prompt.question("Please enter the city name:\n", function(answer){
  prompt.close(resolve(answer));
 });
});

userNamePromise.then(function(value){
  const request = https.get(`https://api.openweathermap.org/data/2.5/find?q=${value.trim()}&units=metric&appid=${key.key}`, (resp) => {
    let data = '';
    if(resp.statusCode == "200"){

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
      let temp = (JSON.parse(data)).list[0].main.temp_max;
      console.log(`Current temperature in ${capitalizeFirstLetter(value.trim())} is ${temp} degree(s)`);
    } catch(error) {
      console.error("City not found. Please try again");
    }
    });
    }else {
      console.log(`Please try again or contact developer. Status: ${http.STATUS_CODES[resp.statusCode]}`);
    }

  });
  request.on("error", (err) => {
    console.log(`Please contact developer`);
  });

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
