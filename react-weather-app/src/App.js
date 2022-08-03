import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import clear from './assets/clear.png';
import clouds from './assets/clouds.png';
import mist from './assets/mist.png';
import rain from './assets/rain.png';
import hot from './assets/hot.png';

import "./App.css";

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bc05bdce40771ba3dd97c8d84b1998e2`;

  const searchLocation = (event) => {
    if (event.key === "Enter"){
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  }

  return (
    <div className="App mx-5">
      <div className="container my-5">
      <h1 className="my-5">Meteo</h1>
      <input  
        className="form-control"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Inserisci una città..."
        type="text" />
        <div className="info"><center>
        <div className="top">
          <div className="location"><br />
            <h1>{data.name ? data.name : "Inserisci una città" }</h1><br />
          </div>
          <div className="temp">
            { data.main ?  <h1>{ Math.round(data.main.temp - 273.5) }°C</h1> : null }
          </div>
          <div className="description">
            { data.weather ? <p>{ data.weather[0].main }</p> : null }
            { data.weather ? (data.weather[0].main === "Clear" ? <img alt="clear" src={ clear } /> : null) : null }
            { data.weather ? (data.weather[0].main === "Clouds" ? <img alt="clouds" src={ clouds } /> : null) : null }
            { data.weather ? (data.weather[0].main === "Mist" ? <img alt="mist" src={ mist } /> : null) : null }
            { data.weather ? (data.weather[0].main === "Drizzle" ? <img alt="mist" src={ rain } /> : null) : null }
            { data.weather ? (data.weather[0].main === "Haze" ? <img alt="mist" src={ hot } /> : null) : null }
            { data.weather ? (data.weather[0].main === "Rain" ? <img alt="mist" src={ rain } /> : null) : null }
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            { data.main ?  <p>Percepiti: { Math.round(data.main.feels_like - 273.5) }°C</p> : null }
          </div>
          <div className="humidity">
            { data.main ?  <p>Umidità: { data.main.humidity }%</p> : null }
          </div>
          <div className="wind">
            { data.wind ?  <p>Vento: { Math.round(data.wind.speed * 1.6) }kmh</p> : null }
          </div><br />
        </div>
        </center></div>
        </div>
    </div>
  );
}

export default App;
