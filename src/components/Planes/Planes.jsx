import { useEffect, useContext } from "react"
import Loader from "../Loader/Loader"

import { PlaneContext } from "../../services/context/PlaneContext"

function Planes() {
    const { planes, setPlanes, showPlane, url } = useContext(PlaneContext)

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(res => setPlanes(res.data))
        .catch(err => console.log(err))
    }, [])

    return ( 
        <div className="my-6 planes">
            <h1 className="my-6">Flights live !</h1>
            <button>My Flights</button>
            {planes.length > 0 ?
                <div className="planes-list grid grid-cols-4 gap-4">
                    {planes.map((plane) => (
                        <div onClick={() => showPlane(plane)} key={plane.flight.iata} className="flight mt-6 mb-6 border p-4 border-gray-700">
                            <h2><b>Vol {plane.flight.number} : {plane.airline.name}</b></h2>
                            <p><b>Départ</b> : {plane.departure.airport} - <b>Heure</b> : {plane.departure.estimated.slice(11, -9)}</p>
                            <p>to</p>
                            <p><b>Arrivée</b> : {plane.arrival.airport} - <b>Heure</b> : {plane.arrival.estimated.slice(11, -9)}</p>
                        </div> 
                    ))} 
                </div> : < Loader />
            }
        </div>
     );
}


export default Planes;