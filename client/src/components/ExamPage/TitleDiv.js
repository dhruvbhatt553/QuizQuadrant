import React, { useContext } from 'react';
import examContext from '../../context/exam/examContext';

export default function TitleDiv() {

    const { examData, remainingMin, remainingSec } = useContext(examContext);

    return (
        <div id='titleDiv' className='w-full h-12 flex items-center px-3 bg-gray-400'>
            <div className='w-full'>
                <h1 className='float-start font-bold'>{examData.title}</h1>
                <h1 className='float-end font-semibold'>
                    <span>Time Remaining: {remainingMin} min | {remainingSec} sec</span>
                </h1>
            </div>
        </div>
    );
};