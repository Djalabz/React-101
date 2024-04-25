import { useState, useEffect } from 'react'
import './Quote.css'
import column from '../../assets/column.png'
import axios from 'axios'

function Quote() {
    const [quote, setQuote] = useState([])
    const [summary, setSummary] = useState('')

    useEffect(() => {
        generateQuote()
    }, [])

    const generateQuote = () => {
            axios.get('https://type.fit/api/quotes')
            .then(res => res.data)
            .then(quote => {
                let random = Math.floor(Math.random() * quote.length)
                console.log(quote[random])
                setQuote(quote[random])
            })
            .catch((e) => console.log(e))
            setSummary('')
    }

    const getWiki = async (quote) => {
        if (!summary) {
            try {
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${quote.author}`
                const response = await axios.get(url)
                const { extract } = response.data
                
                setSummary(extract.slice(0, 150))

            } catch (err) {
                console.log(err)
                setSummary('On connait pas ....')
            }
        } else {
            setSummary('')
        }
    }

    return (
        <>
            <h2>Quote for today !</h2>
            <div className="quote">
                <p className="text">{quote.text}</p>
                <p className="author">{quote.author}</p>
                <button onClick={() => generateQuote()}>Générer</button>
                {summary && (
                    <div className='wiki'>
                        <p><b>{quote.author}</b></p>
                        <p>{summary} ...</p>
                    </div>
                )}
                <img onClick={() => getWiki(quote)} src={column} className="wiki-btn"></img>
            </div>
        </>
    ) 
}

export default Quote