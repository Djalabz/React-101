import { useState, useEffect } from 'react'

import questions from '../../data/language'

function Language() {
    const [answer, setAnswer] = useState('')
    const [prompt, setPrompt] = useState('')

    console.log(answer.length)

    const handlePrompt = (e) => {
        setPrompt(e.target.value)
        console.log(prompt)
    }

    return ( 
        <div className="language app">
            <div className="head">Hi ! Welcome to your English Lesson !</div>
            <div className="exercice"></div>
            <div className="sentence">
                {questions[0].sentence[0]}
                    <input className="prompt" onChange={handlePrompt(e)}/>{prompt}
                {questions[0].sentence[1]}
            </div>
            <button className="validate" onClick={() => setAnswer({prompt})}>Go !</button>
            {answer.length > 0 && 
                <div className="result">
                    {(answer === questions[0].answer) ? 
                    <div>Correct</div>
                    : <div>Incorrect</div>}
                </div>}
        </div>
     )
}

export default Language
