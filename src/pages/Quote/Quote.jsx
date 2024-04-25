import { useState, useEffect } from 'react'
import column from '../../assets/column.png'
import './Quote.css'
import axios from 'axios'

function Quote() {
    const [quote, setQuote] = useState({})
    const [summary, setSummary] = useState('')
    const [favorite, setFavorite] = useState({})

    useEffect(() => generateQuote(), [])

    useEffect(() => {
        axios.post(`http://localhost:3000/quote/add`, favorite)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [favorite])

    function generateQuote() {
        axios.get('https://type.fit/api/quotes')
        .then(res => res.data)
        .then(quotes => {
            let random = Math.floor(Math.random() * quotes.length)
            console.log(quotes[random])
            setQuote(quotes[random])
        })
        .catch(err => console.log(err))

        setSummary('')
    }

    function addQuote(quote) {
        setFavorite(quote)
    }

    async function getWiki(author) {
        if (!summary) {
            try {
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${author}`
                const response = await axios.get(url)
                const { extract } = response.data
                
                setSummary(extract.slice(0, 150))

            } catch (err) {
                console.log(err)
                setSummary('Pas d\'infos disponibles')
            }
        } else {
            setSummary('')
        }
    } 

    return ( 
        <>
            <div className="quote">
                <div className="text">{quote.text}</div>
                <div className="author">{quote.author.slice(0, -10)}</div>
                <button onClick={() => addQuote(quote)} className='fav-quote'>Ajouter aux Favoris</button>
                <button onClick={() => generateQuote()}>Générer</button>
                {summary && 
                <div className="wiki">
                    <p><b>{quote.author.slice(0, -10)}</b></p>
                    <p>{summary} ...</p>
                </div>}
                <img className='wiki-btn' src={column} onClick={() => getWiki(quote.author.slice(0, -10))}/>
            </div>
        </>
     );
}

export default Quote;