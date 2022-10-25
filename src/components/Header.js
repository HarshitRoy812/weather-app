import React from 'react';
import '../styles/navbar.css';

export default function Header({location,setLocation,search})
{
    return (
        <div className = 'navbar'>

            <h1 className = 'navbar_heading'> TheWeatherForecast </h1>

            <div className = 'search'>
                <i className="fa-solid fa-magnifying-glass search_icon"></i>
                <input type = 'text' className = 'searchbox' placeholder = 'Search for a city ..'
                value = {location} onChange = {(e) => setLocation(e.target.value)} />
                <button className = 'search_btn' onClick = {() => search()}> Search </button>
            </div>

        </div>
    )
}