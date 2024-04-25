import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const PlaneContext = createContext()

export const PlaneContextProvider = ({ children }) => {
    const [planes, setPlanes] = useState([])
    const [plane, setPlane] = useState({})
    const [myFlights, setMyFlights] = useState([])

    const url = "http://api.aviationstack.com/v1/flights?access_key=4889a7bbc4058faed4d753e1b8aaf820"

    const navigate = useNavigate()

    const showPlane = (plane) => {
        setPlane(plane)
        localStorage.setItem('plane', JSON.stringify(plane))
        navigate(`/plane/${plane.flight.iata}`)
    }

    const PlaneContextValues = { url, planes, setPlanes, plane, setPlane, showPlane, myFlights, setMyFlights }

    return < PlaneContext.Provider value={PlaneContextValues} >{ children }</PlaneContext.Provider>
}

