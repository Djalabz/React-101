import { useState } from 'react'

import questions from '../../data/questions'

function Quiz() {
    // Données - Quelle est la question actuelle ? Quel est le score ? On pourra pour afficher les bonnes questions / options 
    // passer par l'index
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [score, setScore] = useState(0)


    // Comportements - Quand on clique sur un choix par exemple
    function handleClick(option) {
        if (option === questions[indexQuestion].answer) {
            setScore(prevScore => prevScore + 1)
        }
        setIndexQuestion(prevIndex => prevIndex + 1)
    }

    function handleReset() {
        setIndexQuestion(0)
        setScore(0)
    }


    return ( 
        <div className="quiz">
            <h1>Mon Quiz React !</h1>
            <div className="score">{score} / 3</div>

            {questions[indexQuestion] ?  
            <>
                <div className="question-section">
                    {/* Ici on affiche notre question */}
                    <h2>{questions[indexQuestion].question}</h2>
                </div>
                <div className="options-section">
                    {/* Ici on affiche nos réponses */}
                    {questions[indexQuestion].options.map(option => (
                        <button onClick={() => handleClick(option)}>{option}</button>
                    ))}
                </div>
            </> 
            : <button onClick={() => handleReset()}>Recommencer</button>
            }
        </div>
    )
}

export default Quiz;
