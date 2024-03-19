import React from 'react';

export default function LeftDiv(props) {

    const { examQuestions, setExamQuestions, questionIndex, setQuestionIndex, unsaved, setUnsaved } = props;

    const addNewQuestion = () => {
        if(!unsaved) {
            const newQuestion = new Object({
                type: "",
                subject: "",
                subtopic: "",
                positiveMarks: "",
                negativeMarks: "",
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
                solution: "",
                solutionImage: "",
                correctAnswer: []
            });
            const arr = [...examQuestions];
            arr.push(newQuestion);

            setExamQuestions(arr);
            setQuestionIndex(arr.length - 1);
            setUnsaved(true);
        } else {
            window.alert("You have some unsaved work on current question. Kindly save the question and try again...");
        }
    }

    const changeDisplayQuestion = (e) => {
        if(!unsaved) {
            setQuestionIndex(Number(e.target.value));
        } else {
            window.alert("You have some unsaved work on current question. Kindly save the question and try again...");
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