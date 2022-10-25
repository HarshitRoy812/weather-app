import React, {useState} from 'react';
import './styles/app.css';
import Header from './components/Header';
import Main from './components/Main';

export default function App()
{

  const api_key = '59a4e6f6f5a84ccef992b4e7ad150d0e';
  const api_orig =  'https://api.openweathermap.org/data/2.5/';

  const [location,setLocation] = useState('');
  const [weather,setWeather] = useState({});
  const [show,setShow] = useState(false);

  const search = () => {
    
    fetch(`${api_orig}weather?q=${location}&units=metrics&APPID=${api_key}`)
    .then(res => {
      if (res.ok)
      {
        return res.json();
      }
      else 
      {
        alert('Please enter a valid location !');
        throw Error(res.statusText);
      }
      
    })
    .then(data => {
      setWeather(data);
      setLocation('');
      setShow(true);
    })
    

    
  }



  return (
    <div className = {show && Math.round(weather.main.temp - 273.15,2) > 25 ? "main_body hot" : "main_body"}>

      <Header location = {location} setLocation = {setLocation} search = {search} />
      {show && <Main weather = {weather} />}





      {/* Credit stuff */}
      <div className = 'credit'>
        <a className = 'icon' target="_blank" href="https://icons8.com/icon/15359/partly-cloudy-day">Partly Cloudy Day</a> <span className = 'icon'> icon by </span> <a className = 'icon' target="_blank" href="https://icons8.com">Icons8</a> 
      </div>
    
    </div>

    
  )
}