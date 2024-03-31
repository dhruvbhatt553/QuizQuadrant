import React, { useContext, useEffect, useState } from 'react';
import TitleDiv from './TitleDiv';
import InstructionDiv from './InstructionDiv';
import QuestionDiv from './QuestionDiv';
import NavigationDiv from './NavigationDiv';
import UtilityDiv from './UtilityDiv';
import ExamFinishDiv from './ExamFinishDiv';
import examContext from '../../context/exam/examContext';

export default function ExamPage() {
  
    const { examStart, examFinish, examData, fetchExamData } = useContext(examContext);

    useEffect(() => {
        fetchExamData();
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
                                { examStart && (<NavigationDiv />) }
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