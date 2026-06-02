import { useEffect, useState } from "react"

import weatherService from "../services/weather"

const Weather = ({city}) => {
    const [iconUrl, setIconUrl] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)

    useEffect(() => {
        const newWeather = weatherService.getWeather(city).then(newWeather => {
            setIconUrl(newWeather.iconUrl)
            setTemperature(newWeather.temperature)
            setWindSpeed(newWeather.windSpeed) 
        }) 
    }, [])

    return (
        <div>
            <h1>Weather in {city}</h1>
            <div>
                <img src={iconUrl} />
                <p>Temperature: {temperature} °C</p>
                <p>Wind: {windSpeed} m/s</p>
            </div>
        </div>
    )
}

export default Weather