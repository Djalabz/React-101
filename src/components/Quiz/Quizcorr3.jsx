import { useState } from 'react'
import questions from '../../data/questions'

function Quiz() {
    // Données - Quelle est la question actuelle ? Quel est le score ? On pourra pour afficher les bonnes questions / options 
    // passer par l'index
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [score, setScore] = useState(0)

    // Comportements - Quand on clique sur un choix par exemple ou sur "recommencer"
    const handleClick = (item) => {
        if (item === questions[indexQuestion].answer) {
            setScore(prevScore => prevScore + 1)
        }

        setIndexQuestion(prevIndex => prevIndex + 1)
    }

    const handleReset = () => {
        setScore(0)
        setIndexQuestion(0)
    }


    return ( 
        <div className="quiz">
            <h1>Mon Quiz React !</h1>
            <div className="score">Score : {score} / 3</div>

            {questions[indexQuestion] ? 
                <div>
                    <h2>{questions[indexQuestion].question}</h2>
                    <div>{questions[indexQuestion].options.map((item, key) => (
                        <button key={index} onClick={() =>handleClick(item)}>{item}</button>
                    ))}</div>
                </div>
                : <div>
                    <p>Quiz fini !</p>
                    <button onClick={handleReset}>Recommencer</button>
                </div>}
        </div>
    )
}

export default Quiz;
