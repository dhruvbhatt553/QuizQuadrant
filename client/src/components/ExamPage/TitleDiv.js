import React from 'react';

export default function TitleDiv(props) {

    const { title, duration } = props;

    return (
        <div id='titleDiv' className='w-full h-12 flex items-center px-3 bg-gray-400'>
            <div className='w-full grid grid-cols-4'>
                <h1 className='col-span-3 text-left font-bold'>{title}</h1>
                <h1 className='col-span-1 text-right font-semibold'>
                    <span>Time Remaining: </span>
                    <span>122</span>
                    <span> min</span>
                    <span> | </span>
                    <span>23</span>
                    <span> sec</span>
                </h1>
            </div>
        </div>
    );
};