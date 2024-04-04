import React, { useContext } from 'react';
import examContext from '../../context/exam/examContext';

export default function UtilityDiv(props) {

    const { examData, currQuestionIndex, violationCount, examStart, instructionRead, handleQuestionNumberBtn, handleStartExamBtn, handleFinishExamBtn } = useContext(examContext);

    return (
        <>
            <div id='studentInfoDiv' className='w-full flex h-[calc(20%)]'>
                <div className='w-full'>
                    <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>
                        Name: {examData.candidateName}
                    </h1>
                    <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>
                        Email: {examData.candidateEmail}
                    </h1>
                    <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>
                        Violations Count: {violationCount}
                    </h1>
                </div>
            </div>
            {
                examStart &&
                (
                    <div id='questionNumberDiv' className='w-full h-[calc(70%)] border-black border-b-4 overflow-auto'>
                        <div className='w-full grid grid-cols-5 gap-3 p-3'>
                            {
                                examData.questionIds.map((questionId, index) => {
                                    return (
                                        <button
                                            key={questionId}
                                            value={index}
                                            className={`w-full aspect-square place-self-center rounded-full cursor-pointer text-white font-bold grid items-center hover:bg-blue-900 ${currQuestionIndex === index ? "bg-black" : "bg-blue-700"}`}
                                            onClick={(e) => { handleQuestionNumberBtn(e) }}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }
            <div className='w-full h-[calc(10%)] grid justify-items-stretch px-3 py-2'>
                {examStart && (<button id='finishExamBtn' className='bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white' onClick={handleFinishExamBtn}>FINISH EXAM</button>)}
                {!examStart && instructionRead && (<button id='startExamBtn' className='bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white' onClick={handleStartExamBtn}>Start Exam</button>)}
            </div>
        </>
    );
}