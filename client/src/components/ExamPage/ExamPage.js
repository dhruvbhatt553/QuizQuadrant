import React, {useContext, useEffect, useState} from 'react';
import TitleDiv from './TitleDiv';
import InstructionDiv from './InstructionDiv';
import QuestionDiv from './QuestionDiv';
import UtilityDiv from './UtilityDiv';
import ExamFinishDiv from './ExamFinishDiv';
import examContext from '../../context/exam/examContext';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function ExamPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const {
        examStart,
        examFinish,
        examData,
        fetchExamData,
        fetchMockExamData,
        startTimer,
        addEventListeners
    } = useContext(examContext);

    useEffect(() => {
        if(location.state) {
            const getExamData = async () => {
                let data = null;
                if (location.state.isMockTest) {
                    data = await fetchMockExamData(location.state.mockExam);
                } else {
                    data = await fetchExamData(location.state.examId);
                }
                startTimer(data);
                addEventListeners(data);
            }
            getExamData();
            console.log("exam div rendered ...");
        } else {
            navigate("/");
        }
    }, []);


    return (
        <>
            <div className='xl:hidden lg:hidden text-lg px-5 w-full h-full flex items-center text-red-600 font-bold'>
                <div>
                    <h1>This service is not available in Mobile phones and Tablets. Please try to sign in using your PC
                        or Laptop.</h1>
                    <Link
                        to={"/"}
                        className={"inline-block bg-blue-700 text-white px-3 py-2 rounded-lg my-3"}
                    >
                        Return to HomePage
                    </Link>
                </div>
            </div>
            {
                examData ?
                    (
                        !examFinish &&
                        (
                            <div className='w-full h-screen absolute top-0 prevent-select hidden xl:block lg:block'>
                                <div id='leftDiv' className='w-full lg:w-3/4 h-full float-start'>
                                    <TitleDiv/>
                                    {!examStart && (<InstructionDiv/>)}
                                    {examStart && (<QuestionDiv/>)}
                                </div>
                                <div id='rightDiv'
                                     className='w-full h-[calc(100%-6rem)] lg:w-1/4 lg:h-full float-end hidden lg:block bg-gray-300 border-black lg:border-l-4'>
                                    <UtilityDiv/>
                                </div>
                            </div>
                        )
                    ) :
                    (
                        <div className='w-full h-full flex items-center grid justify-items-stretch'>
                            <img src='images/loading.gif' className='justify-self-center'/>
                            <h1 className='text-xl'>Fetching exam details ...</h1>
                        </div>
                    )
            }
            {
                examFinish &&
                (
                    <ExamFinishDiv/>
                )
            }
        </>
    );
};