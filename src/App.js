import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountries();
    // Gets all countries of the API
  }, [countries]);

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value='abc'
            onChange={(e) => console.log(e)}
          >
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Select input dropdown */}

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* table */}
      {/* graph */}

      {/* Map */}
    </div>
  );
}

export default App;
