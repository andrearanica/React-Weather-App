import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    <center>
    <div className="App">
        <input  
        className="form-control"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Inserisci una città..."
        type="text" />
        <div className="top">
          <div className="location"><br />
            <p>{data.name}</p><br /><hr />
          </div>
          <div className="temp">
            { data.main ?  <h1>{ data.main.temp - 273.5 }°C</h1> : null }
          </div>
          <div className="description">
            { data.weather ? <p>{ data.weather[0].main }</p> : null }
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            { data.main ?  <p>Percepiti: { data.main.feels_like - 273.5 }°C</p> : null }
          </div>
          <div className="humidity">
            { data.main ?  <p>Umidità: { data.main.humidity }%</p> : null }
          </div>
          <div className="wind">
            { data.wind ?  <p>Vento: { data.wind.speed }mph</p> : null }
          </div><br />
        </div>
    </div>
    </center>
  );
}

export default App;
