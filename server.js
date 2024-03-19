const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
var data1={};

const csvData = fs.readFileSync('population-and-demography.csv', 'utf8');
const rows = csvData.split('\n').map(row => row.split(','));



// Process rows as needed
var countriesdict = {};
var yearsdict = {};
var keys = rows[0];
var previous_countryname;
for (var i=1;i<rows.length;i++){
    //parse the data and store the data into a three dimensional dictionary
    //The structure of the dictionary is data[country_name][year][type of data]
    var rowsdict={};
    currentrow = rows[i];
    countryname = String(currentrow[0]);
    currentyear = currentrow[1];
    if (i == 1){
      previous_countryname = String(countryname);
    }
    if (previous_countryname != countryname){
      countriesdict[previous_countryname] = yearsdict;
      yearsdict = {};
    }
    for (var j=2;j<keys.length;j++){
        rowsdict[String(keys[j])] = Number(currentrow[j]);
    }
    yearsdict[currentyear] = rowsdict;
    previous_countryname = String(countryname);

}

const data = countriesdict;


// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to serve the data
app.get('/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});