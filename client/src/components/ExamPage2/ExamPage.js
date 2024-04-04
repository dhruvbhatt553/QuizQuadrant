import React, { useContext, useEffect, useState } from 'react';
import TitleDiv from './TitleDiv';
import InstructionDiv from './InstructionDiv';
import QuestionDiv from './QuestionDiv';
import UtilityDiv from './UtilityDiv';
import ExamFinishDiv from './ExamFinishDiv';
import examContext from '../../context/exam/examContext';
import {useLocation} from "react-router-dom";

export default function ExamPage() {

    const location = useLocation();
    const { examId,isMockTest,mockExam } = location.state;
    let examStart, examFinish, examData, fetchExamData, startTimer;

if (!isMockTest) {
    ({ examStart, examFinish, examData, fetchExamData, startTimer } = useContext(examContext));
} else {
    ({ examStart, examFinish, examData, fetchExamData, startTimer } = mockExam.data);
}


    useEffect(() => {
        if(!isMockTest) {
        const getExamData = async () => {
            const data = await fetchExamData(examId);
            startTimer(data.startTime, data.duration);
        }
        getExamData();
    }
    else {
        startTimer(mockExam.startTime, mockExam.duration);
    }
        console.log("exam div rendered ...");
    }, []);


    return (
        <>
            {
                examData ?  
                ( 
                    !examFinish && 
                    (
                        <div className='w-full h-screen absolute top-0 prevent-select'>
                            <div id='leftDiv' className='w-full lg:w-3/4 h-full float-start'>
                                <TitleDiv />
                                { !examStart && (<InstructionDiv />) }
                                { examStart && (<QuestionDiv />) }
                            </div>
                            <div id='rightDiv' className='w-full h-[calc(100%-6rem)] lg:w-1/4 lg:h-full float-end hidden lg:block bg-gray-300 border-black lg:border-l-4'>
                                <UtilityDiv />
                            </div>
                        </div>
                    )
                ) : 
                (
                    <div className='w-full h-full flex items-center grid justify-items-stretch'>
                        <img src='images/loading.gif' className='justify-self-center' />
                        <h1 className='text-xl'>Fetching exam details ...</h1>
                    </div>
                )
            }
            {examFinish && (<ExamFinishDiv />)}
        </>
    );
};