import { useState, useEffect } from 'react'
import axios from 'axios'
import column from '../../assets/column.png'
import './Quote.css'

let quoteURL = 'https://type.fit/api/quotes'

function Quote() {

    // Nos states

    // Nos Effects

    // Nos comoportements (générer la quote et afficher le wiki)

    function generateQuote() {
            axios.get(quoteURL)
            .then((res) => res.data)
            .then((data) => {
                let random = Math.floor(Math.random() * data.length)
                setQuote(data[random])
                setSummary('')
            })
            .catch(e => console.log(e))
    }

    async function getWiki(author) {
        if (!summary) {
            try {
                axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${author}`)
                .then(res => {
                    console.log(res.data)
                    const { extract } = res.data
                    setSummary(extract.slice(0, 150))
                })
                .catch((e) => console.log(e))
            } catch (e) {
                console.log(e)
                setSummary('Pas d\'infos disponibles')
        }} else {
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
                { summary &&                     
                    <div className='wiki'>
                        <p><b>{quote.author}</b></p>
                        <p>{summary} ...</p>
                    </div> }
                <img src={column} className="wiki-btn" onClick={() => getWiki(quote.author)}></img>
            </div>
        </>
     );
}

export default Quote;