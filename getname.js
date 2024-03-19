const fs = require('fs');
const axios = require('axios');

// Function to fetch data from the URL
const fetchData = async () => {
    try {
        // Fetch GeoJSON data from the URL
        const response = await axios.get("https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/natural-earth-countries-1_110m@public/exports/geojson?lang=en&timezone=Europe%2FBerlin");
        const data = response.data;

        // Extract country names from the GeoJSON data
        const countryNames = data.features.map(feature => feature.properties.name);

        // Write the country names to a local file
        fs.writeFileSync('country_names.txt', countryNames.join('\n'));
        
        console.log('Country names written to country_names.txt');
    } catch (error) {
        console.error('Error fetching or writing country names:', error.message);
    }
};

// Call the fetchData function
fetchData();