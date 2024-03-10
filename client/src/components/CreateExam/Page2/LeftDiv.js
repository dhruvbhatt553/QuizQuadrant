import React from 'react';

export default function LeftDiv(props) {

    const { examQuestions, setExamQuestions, questionIndex, setQuestionIndex, unsaved } = props;

    const addNewQuestion = () => {
        const newQuestion = new Object({
            type: "mcq",
            question: "",
            questionImage: "",
            optionA: "",
            optionAImage: "",
            optionB: "",
            optionBImage: "",
            optionC: "",
            optionCImage: "",
            optionD: "",
            optionDImage: "",
            correctAnswer: [""]
        });
        const arr = [...examQuestions];
        arr.push(newQuestion);
        setExamQuestions(arr);
    }

    const changeDisplayQuestion = (e) => {
        if(unsaved) {
            window.alert("You have some unsaved work on current question. Kindly save the question and try again...");
        } else {
            setQuestionIndex(Number(e.target.value));
        }
    }

    return (
        <>
            <div className='w-full mb-2'>
                <button onClick={addNewQuestion} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center'>Add More</button>
            </div>
            <div className='w-full mt-5 grid grid-cols-4 gap-3'>
                {
                    examQuestions.map((question, index) => {
                        return (
                            <button key={index} value={index} onClick={(e) => changeDisplayQuestion(e)} className='w-full aspect-square rounded-full bg-gray-400 text-lg font-bold'>{index + 1}</button>
                        );
                    })
                }
            </div>
        </>
    );
};