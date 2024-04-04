import React, { useContext } from 'react';
import examContext from '../../context/exam/examContext';

export default function TitleDiv() {

    const { examData, remainingMin, remainingSec } = useContext(examContext);

    return (
        <div id='titleDiv' className='w-full h-12 flex items-center px-3 bg-gray-400'>
            <div className='w-full grid grid-cols-4'>
                <h1 className='col-span-3 text-left font-bold'>{examData.title}</h1>
                <h1 className='col-span-1 text-right font-semibold'>
                    <span>Time Remaining: {remainingMin} min | {remainingSec} sec</span>
                </h1>
            </div>
        </div>
    );
};