import { useContext, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Loader from "../Loader/Loader";

import { PlaneContext } from "../../services/context/PlaneContext";

function Plane() {
    const { setMyFlights, setPlane, plane } = useContext(PlaneContext)

    const navigate = useNavigate()
    
    const { id } = useParams()
    
    let url = `http://api.aviationstack.com/v1/flights?access_key=4889a7bbc4058faed4d753e1b8aaf820`
    
    // const savedPlane = JSON.parse(localStorage.getItem('plane'))

    useEffect(() => {
        if (Object.keys(plane).length === 0) {
            fetch(url, {
                flight_iata: {id}
            })
            .then(res => res.json())
            .then(res => res.data.filter(elem => elem.flight.iata === id))
            .then(res => setPlane(res[0]))
            .catch(err => console.log(err))
            console.log("empty")
        } else {
            console.log("effect")
        }
    }, [])

    console.log(Object.keys(plane).length)
    console.log(plane)

    // useEffect(() => {
    //     if (myFlights.length > 0) {
    //         localStorage.setItem('myFlights', JSON.stringify(myFlights));
    //     }
    // }, [myFlights])


    return ( 
        <>
            {Object.keys(plane).length ? 
                <>
                    <div className="mb-12">
                        <h2 className="text-xl mb-12"><b>{plane.airline.name}</b></h2> 
                        <p>{plane.departure.airport} - {plane.departure.scheduled.slice(11, -9)}</p>
                        <p><b>to</b></p>
                        <p>{plane.arrival.airport} - {plane.arrival.scheduled.slice(11, -9)}</p> 
                    </div>
                    <button className="mr-4" onClick={() => setMyFlights(prev => [...prev, plane])}>Save this flight</button>
                    <button onClick={() => navigate('/planes')}>Back to planes</button>
                </>

                : < Loader />
            }
        </>
     );
}

export default Plane;