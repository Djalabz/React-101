import { useEffect, useState } from "react"

import md5 from "md5"

import axios from "axios"

function Marvel() {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        requestCharacters();
    }, [])
    
    const requestCharacters = async () => {
        const baseUrl = `http://gateway.marvel.com/v1/public/characters?`;
        const time = Number(new Date());
    
        const hash = md5(time + `d271ecf2c7b3a5da810679dc831120ffec682c02` + `fdd5385bdeb978adcb82cf5e83339162`);
    
        const finalUrl = `${baseUrl}&ts=${time}&apikey=fdd5385bdeb978adcb82cf5e83339162&hash=${hash}`

        
        const res = await axios.get(finalUrl)
        
        console.log(res.data.data.results)

        setCharacters(res.data.data.results)
    }

    return ( 
        <div>
            <h1>Marvel !</h1>
            {characters.map((char, index) => (
                <li key={index}>
                    <p>{char.name}</p>
                </li>
                
            ))}
        </div>
     );
}

export default Marvel;