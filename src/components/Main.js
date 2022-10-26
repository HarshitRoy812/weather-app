import React , {useEffect} from "react";
import '../styles/main.css';

export default function Main({weather,day,time})
{
    const weather_details = {
        location : weather.name,
        temperature : Math.round(weather.main.temp - 273.15,2),
        abbr : weather.sys.country,
        minTemp : Math.round(weather.main.temp_min - 273.15,2),
        maxTemp : Math.round(weather.main.temp_max - 273.15,2),
        weatherType : weather.weather[0].main,
        humidity : weather.main.humidity,
        pressure : weather.main.pressure,
        windSpeed : weather.wind.speed
    }

    useEffect(() => {
        
        if (weather_details.temperature > 25)
        {
            document.body.classList.add('hot');
        }
        else 
        {
            document.body.classList.remove('hot');
        }

    },[weather_details]);

    return (
        <React.Fragment>

            <div className = 'weather_content'>

                <h1 id = 'weather_loc' className = 'weather_location'> {weather_details.location} ({weather_details.abbr}) </h1>
                <p className = 'time_day'> <span> {time} </span> {day} </p>
                <h1 id = 'weather_temperature' className = 'weather_temp'> {weather_details.temperature}°C </h1>

                <div className = 'temperature'>
                    <p> <span> Min </span> {weather_details.minTemp}°C </p>
                    <p> <span> Max </span> {weather_details.maxTemp}°C </p>
                </div>

                <h1 className ='weather_type'> {weather_details.weatherType} </h1>
            </div>

            <div className = 'extra_weather_content'>

                <p> <i className="fa-solid fa-cloud"></i> Humidity : {weather_details.humidity} </p>
                <p> <i className="fa-solid fa-temperature-three-quarters"></i> Pressure : {weather_details.pressure} </p>
                <p> <i className="fa-solid fa-wind"></i> Wind Speed : {weather_details.windSpeed} m/sec </p>

            </div>


        </React.Fragment>

        
    )
}