import { useState } from 'react'

import './Quiz.css'

const questions = [
    {
        id: 1,
        question: 'What is React ?',
        options: ['A post-punk band', 'A tech company', 'A JS framework', 'A new ball sport'],
        answer: 'A JS framework'
    },
    {
        id: 2,
        question: 'How do we handle state in React ?',
        options: ['State ?', 'With PHP', 'useState()', 'this.state'],
        answer: 'useState()'
    },
    {
        id: 3,
        question: 'Do we like React ?',
        options: ['react what ?', 'A lot more than JS', 'Some days', 'Just yes'],
        answer: 'Just Yes'
    }
] 

function Quiz() {
    // 1) Ici nos données du State (Quelle est la question actuelle par exemple, on pourra utiliser l'index du tableau questions)
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [score, setScore] = useState(0)


    // 2) Ici nos comportements (quand on clique sur une option)
    const handleClickOption = (option) => {
        if (option === questions[indexQuestion].answer) {
            setScore(prev => prev + 1)
        }
        setIndexQuestion(prev => prev + 1)

    }

    const handleReset = () => {
        setIndexQuestion(0)
        setScore(0)
    }

    return (
        <div className="quiz">
            <h1>Mon Quiz !</h1>

            <div className="score">{score} / 3 points</div>
            
            {questions[indexQuestion] ? 
                <>
                    <div className="question-section">
                    {/* Ici on affiche notre question */}
                        { questions[indexQuestion].question }
                    </div>

                    <div className="options-section">
                    {/* Ici on affiche les choix disponibles sous forme de boutons avec .map() et on passe l'option en param */}
                        { questions[indexQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleClickOption(option)}>{option}</button>
                        ))}
                    </div>
                </> : 
                <button onClick={handleReset}>Recommencer</button>}
        </div>
    ) 
}

export default Quiz