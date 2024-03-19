import React, { useState } from 'react';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';

export default function Page2(props) {

    const { examQuestions, setExamQuestions, subjectwiseTopics, unsaved, setUnsaved, questionIndex, setQuestionIndex } = props;

    return (
        <>
            <div className='w-full h-full flex'>
                <div className='w-1/5 bg-gray-200 p-3 overflow-auto'>
                    <LeftDiv examQuestions={examQuestions} setExamQuestions={setExamQuestions} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} unsaved={unsaved} setUnsaved={setUnsaved} />
                </div>
                <div className='w-4/5 text-left text-xl px-5 overflow-auto'>
                    <RightDiv examQuestions={examQuestions} setExamQuestions={setExamQuestions} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} unsaved={unsaved} setUnsaved={setUnsaved} subjectwiseTopics={subjectwiseTopics} />
                </div>
            </div>
        </>
    );
}