import React, {useState,useRef} from 'react';
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
  const [fullDay,setFullDay] = useState('');
  const [time,setTime] = useState('');
  const someTime = useRef(null);

  const search = () => {
    
    fetch(`${api_orig}weather?q=${location}&units=metrics&APPID=${api_key}`)
    .then(res => {
      if (res.ok)
      {
        clearInterval(someTime.current);
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
      fetchTime(data);
    })

  }

  const fetchTime = (weather) => {

    someTime.current = setInterval(() => {
      fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${weather.coord.lat}&longitude=${weather.coord.lon}`)
    .then(res => res.json())
    .then(data => {
      generateTime(data);
    })
    },1000)
  }

  const generateTime = (data) => {
    const months = [
      "","January","February","March","April","May","June","July","August","September",
      "October","November","December"
    ]

    const day = data.day;
    const month = months[data.month];
    const year = data.year;

    setFullDay(`${day} ${month}, ${year}`);
    setTime(data.time + ':' + data.seconds);
  }


  return (
    <div className = {show && Math.round(weather.main.temp - 273.15,2) > 25 ? "main_body hot" : "main_body"}>

      <Header location = {location} setLocation = {setLocation} search = {search} />
      {show && <Main weather = {weather} day = {fullDay} time = {time} />}





      {/* Credit stuff */}
      <div className = 'credit'>
        <a className = 'icon' target="_blank" href="https://icons8.com/icon/15359/partly-cloudy-day">Partly Cloudy Day</a> <span className = 'icon'> icon by </span> <a className = 'icon' target="_blank" href="https://icons8.com">Icons8</a> 
      </div>
    
    </div>

    
  )
}