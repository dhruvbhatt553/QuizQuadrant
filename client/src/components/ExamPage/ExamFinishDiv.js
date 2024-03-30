import React from 'react';

export default function ExamFinishDiv() {
    return (
        <div className='w-full h-screen grid items-center'>
            <div>
                <h1 className='text-3xl font-bold text-red-700 my-5'>Exam finished !!!</h1>
                <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white'>Return to Home Page</button>
            </div>
        </div>
    );
}