import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import InfoBox from './InfoBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

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
    // Gets all countries from the API
  }, [countries]);

  const ChangeCountry = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value={country} onChange={ChangeCountry}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      {/* Header Ends*/}

      <div className='app__stats'>
        <InfoBox title='Coronavirus cases' cases={123} total={2000} />
        <InfoBox title='Recovered' cases={123} total={3000} />
        <InfoBox title='Deaths' cases={123} total={4000} />
      </div>

      {/* table */}
      {/* graph */}

      {/* Map */}
    </div>
  );
}

export default App;
