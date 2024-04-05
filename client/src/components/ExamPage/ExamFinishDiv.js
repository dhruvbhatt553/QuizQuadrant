import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import examContext from '../../context/exam/examContext';


export default function ExamFinishDiv() {
    const { mockResult, examData, calculateMockTestResult} = useContext(examContext);

    //console.log("Finish exam", examData, mockResult);
   // const {examStart, examFinish, examData, fetchExamData, fetchMockExamData, startTimer} = useContext(examContext);
   useEffect(() => {
       console.log("USE EFFECT FINISH 1");
       if(examData.isMockTest) {
           calculateMockTestResult();
       }
    },[]);

    return (

        <div className='w-full h-full grid items-center'>
            {
                examData.isMockTest && mockResult &&
                <div>
                    <div>
                        <b>Marks </b> : {mockResult.achievedMarks} / {mockResult.totalMarks}
                    </div>
                    <div>
                        <b>Attempted</b> : {mockResult.corrects + mockResult.incorrects}/{mockResult.totalQuestions}
                    </div>
                    <div>
                        <b>Correct</b> : {mockResult.corrects}
                    </div>
                    <div>
                        <b>Incorrect</b> : {mockResult.incorrects}
                    </div>

                </div>


            }
            <div>
                <h1 className='text-3xl font-bold text-red-700 my-5'>Exam finished !!!</h1>
                <Link
                    to="/"
                    className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white'
                >
                    Return to Home Page
                </Link>
            </div>
        </div>
    );
}