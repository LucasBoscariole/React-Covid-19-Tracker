import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card,CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all').then(response => response.json()).then(data => {setCountryInfo(data)})
  },[])
  
  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries); 
        });
    };
    getCountries();
    // Gets all countries from the API
  }, [countries]);

  const ChangeCountry = async (e) => {
    const countryCode = e.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then(response => response.json()).then(data => {
      setCountryInfo(data)
      setCountry(countryCode)
    })

  };

  return (
    <div className='app'>
      <div className="app__left">
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
          <InfoBox title='Coronavirus cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>


        {/* Map */}
        <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worlwide new cases</h3>
        </CardContent>
        {/* table */}
        {/* graph */}
      </Card>
   </div>
  );
}

export default App;
