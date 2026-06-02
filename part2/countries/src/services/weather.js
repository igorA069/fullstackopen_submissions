import axios from "axios"

const getWeather = (city) => {
    const openWeatherMapKey= import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY

    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherMapKey}`)
             .then(reponse => {
                    const weatherIconId = reponse.data.weather[0].icon
                    return {
                        iconUrl: `https://openweathermap.org/payload/api/media/file/${weatherIconId}.png`,
                        temperature: reponse.data.main.temp,
                        windSpeed: reponse.data.wind.speed
                    }
                })
}

export default {getWeather}