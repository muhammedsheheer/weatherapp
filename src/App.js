import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [city, setCity]= useState('India')
  const [temperature, setTempereture]=useState('0')
  const [loading, setLoading]=useState(false)

  function selectCity(cityName,latitude,longitude){
    setLoading(true)
    setCity(cityName)

    axios.get('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
   .then(data=>{
    const temperatureValue=data.data.current_weather.temperature
    setTempereture(temperatureValue)
    setLoading(false)
   })
   .catch(err=>console.log(err))
  }
  return (
    <div className="App">
      <h1>My weather app</h1>
      <div>
        <button onClick={()=>{selectCity('Kochi',9.9312,76.2673)}}>Kochi</button>
        <button onClick={()=>{selectCity('Trivandrum',8.5241,76.9366)}}>Trivandrum</button>
        <button onClick={()=>{selectCity('Calicut',11.2588,75.7804)}}> Calicut</button>
      </div>
      {loading?<p>Loading....</p>:<p>The current temprature at <span id='city'>{city}</span> is &nbsp;&nbsp;<span id='temperature'>{temperature}°C</span> </p>}
    </div>
  );
}

export default App;
