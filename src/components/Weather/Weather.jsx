import { useState, useEffect } from 'react'
import axios from 'axios'
import './Weather.css'

const API_KEY = '28a46ed081fa271f6e1f3b7415825368'
const API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`

function Weather() {
    const [city, setCity] = useState('Paris')
    const [location, setLocation] = useState([])
    const [temperature, setTemperature] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('') 

    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setCity(e.target.elements.city.value)
    // }

    useEffect(() => {
        fetchData()
    }, [city])


    const fetchData = async () => {
        try {
            if (city !== '') {
                const response = await axios.get(`${API_URL}&q=${city}`)
                const { data } = response
                setTemperature((data.main.temp).toFixed())
                // setDescription(data.weather[0].description.toUpperCase())
                setIcon(data.weather[0].icon)
            } else if (location) {
                const response = await axios.get(`${API_URL}&lat=${location[0]}&lon=${location[1]}`)
                const { data } = response
                setCity(data.name)
            }
        } catch (err) {
            console.log(err)
        } 
    }

    // const getLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(({ coords }) => {
    //             setCity('')
    //             setLocation([coords.latitude, coords.longitude])
    //             fetchData()
    //         }, showError())
    //     } else {
    //         alert('Activer la géolocalisation !')
    //     }
    // }

    // const showError = (error) => {
    //     console.log(error)
    // }

    return (
        <div className="weather absolute top-6 right-12 w-32">
            {/* <h2>Météo</h2> */}
            <div className="results absolute right-0">
                <img className="m-auto" src={iconUrl} alt="" />
                <p>Il fait <b>{temperature} °C</b> à <b>{city}</b></p>
                {/* <p className='weather-descr'>{description}</p> */}
            </div>
            {/* <form onSubmit={(e) => handleSubmit(e)} className="user">
                <input type="text"  name="city" placeholder='Entrez une ville'/>
                <button type="submit">Rechercher</button>
                <button onClick={() => getLocation()}>Geolocate Me</button>
            </form> */}
        </div>
    )
}

export default Weather