import { useState } from 'react'
import './Quiz.css'
import questions from '../../data/questions'

function Quiz() {
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [score, setScore] = useState(0)


    function handleClick(option) {
        if (option === questions[indexQuestion].answer) {
            setScore(score => score + 1)
        }
        setIndexQuestion(prev => prev + 1)
    }

    function handleReset() {
        setIndexQuestion(0)
        setScore(0)
    }

    return ( 
        <>
            <h1>Mon Quiz en React</h1>
            <div className="quiz"> 
                <div className="score">Score : {score} / 3</div>
                
                {questions[indexQuestion] ?
                <>
                    <div className="question-section">
                        {questions[indexQuestion].question}
                        </div>

                    <div className="options-section">
                        {questions[indexQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleClick(option)}>{option}</button>
                        ))}
                    </div>
                </> 
                : <button onClick={() => handleReset()}>Recommencer</button>}

            </div>
        </>
    )
}

export default Quiz;