import React, {useContext} from 'react';
import createExamContext from '../../../context/create-exam/createExamContext';

export default function LeftDiv() {

    const {
        examQuestions,
        setExamQuestions,
        questionIndex,
        setQuestionIndex,
        createNewQuestionObject
    } = useContext(createExamContext);

    const addNewQuestion = () => {
        const newQuestion = new Object(createNewQuestionObject());
        const arr = [...examQuestions];
        arr.push(newQuestion);
        setExamQuestions(arr);
        setQuestionIndex(arr.length - 1);
    }

    const changeDisplayQuestion = (e) => {
        setQuestionIndex(Number(e.target.value));
    }

    return (
        <>
            <div className='w-full mb-2'>
                <button onClick={addNewQuestion}
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Add
                    More
                </button>
            </div>
            <div className='w-full mt-5 grid grid-cols-4 gap-3'>
                {
                    examQuestions.map((question, index) => {
                        return (
                            <button
                                key={index}
                                value={index}
                                onClick={(e) => changeDisplayQuestion(e)}
                                className={`w - full aspect-square rounded-full text-lg font-bold text-white ${questionIndex === index ? "bg-black" : "bg-gray-500"}`}
                            >
                                {index + 1}
                            </button>
                        );
                    })
                }
            </div>
        </>
    );
};