import React from 'react';
import { Link } from 'react-router-dom';

export default function ExamFinishDiv() {
    return (
        <div className='w-full h-full grid items-center'>
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