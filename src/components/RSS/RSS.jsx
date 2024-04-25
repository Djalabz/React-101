import { useState, useEffect } from "react"
import axios from 'axios'

function RSS() {
    const [flux, setFlux] = useState()

    useEffect(() => console.log('effect'), [])

    return ( 
        <div className="rss">
            <h2>Really Simple Syndication</h2>
            <div className="flux"></div>
        </div>
     );
}

export default RSS;