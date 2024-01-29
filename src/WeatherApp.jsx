import React, { useState } from 'react'
import { urlBase, API_KEY } from './Helper/dataMain'

export const WeatherApp = () => { 

        // Un estado para la ciudad que puede cambiar por le form.
        const [city, setCity] = useState('')

        // Un estado para el clima que cambia segun la locación.
        const [dataWeather, setDataWeather] = useState(null)

        // Y dos eventos, para el cambio de ciudad y el envio de info.
        const handleChangeCity = (event) => {
                setCity(event.target.value)
        }

        const handleSubmit = (event) => {
                event.preventDefault()
                if (city.length > 0) fetchClima()
        }

        const fetchClima = async() =>{
                try {

                        // Importante poner como variables, los elementos de la "url" que van a cambiar, menos la "API_KEY".
                        // https://api.weatherapi.com/v1/current.json?key=fc49463c499c45dc9a5153523242801&q=London&aqi=no.

                        const response = await fetch(`${urlBase}?key=${API_KEY}&q=${city}&aqi=no`)
                        const data = await response.json()
                        setDataWeather(data)

                } catch (error) {
                        alert('ERROR!!!')
                }
        }

        return (

                <div className="container">

                        <h1>Weather around the world</h1>

                        <form onSubmit={handleSubmit}>

                                <input
                                        type="text"
                                        placeholder='Enter geographic area...'
                                        value={city}
                                        onChange={handleChangeCity}

                                />
                                <button type='submit' className='btn btn-primary'>Search</button>

                        </form>
                        {
                                dataWeather && (
                                        <div>

                                                <h2>{dataWeather.location.name}</h2>
                                                <p>Temperature: {dataWeather.current.temp_c}°C</p>
                                                <p> Weather condition: {dataWeather.current.condition.text}</p>
                                                <div>
                                                        <img src={`${dataWeather.current.condition.icon}`} alt="" />
                                                </div>
                                        </div>
                                )
                        }
                </div>

        )
}



