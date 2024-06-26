import React, { useRef, useState } from 'react'
import './quiz.css'
import { QAdata } from '../../Data/QA'

const Quiz = () => {
    let [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(QAdata[index])
    const [once, setOnce] = useState(false)
    const [mark, setMark] = useState(0)
    const [final, setFinal] = useState(false)

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const optionArray = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e, ans) => {
        // console.log(e)
        if (once === false) {
            if (question.answer === ans) {
                e.target.classList.add("correct");
                setOnce(true);
                setMark(prev=>prev+1);
            }
            else {
                e.target.classList.add("wrong");
                setOnce(true);
                // console.log(optionArray[question.answer - 1])
                optionArray[question.answer - 1].current.classList.add("correct")
            }
        }
    }

    const next = () => {
        if (once === true) {
            if (index === QAdata.length - 1) {
                setFinal(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(QAdata[index]);
            setOnce(false);
            optionArray.map((opt) => {
                opt.current.classList.remove("correct")
                opt.current.classList.remove("wrong")
                return null
            })
        }
    }
    const reset =()=>{
        setIndex(0);
        setQuestion(QAdata[index]);
        setMark(0);
        setOnce(false);
        setFinal(false);
    }

    return (
        <div className='container'>
            <h1>Quiz Q&A</h1>
            <hr />
            {final ? <>
            <h2>You Scored {mark} / {QAdata.length} </h2>
            <button onClick={reset}>Reset</button>
            </> : <>
                <h2>
                    {index + 1}. {question.question}
                </h2>
                <ul>
                    <li onClick={(e) => { checkAnswer(e, 1) }} ref={Option1}>{question.option1}</li>
                    <li onClick={(e) => { checkAnswer(e, 2) }} ref={Option2}>{question.option2}</li>
                    <li onClick={(e) => { checkAnswer(e, 3) }} ref={Option3}>{question.option3}</li>
                    <li onClick={(e) => { checkAnswer(e, 4) }} ref={Option4}>{question.option4}</li>
                </ul>
                <button onClick={next}>Next</button>
                <div className='indexNo'>{index + 1} to {QAdata.length} Questions</div>
            </>}
        </div>
    )
}

export default Quiz
