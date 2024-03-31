import React, { useContext } from 'react';
import examContext from '../../context/exam/examContext';

export default function NavigationDiv() {

    const { handlePrevBtn, handleNextBtn, handleClearSelectionBtn, handleSaveBtn} = useContext(examContext);

    return (
        <div id='navigationDiv' className='w-full h-52 lg:h-12 flex items-center px-3 bg-gray-400'>
            <div className='w-full'>
                <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-start' onClick={handlePrevBtn}>Prev</button>
                <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center' onClick={handleClearSelectionBtn}>Clear</button>
                <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center' onClick={handleSaveBtn}>Save</button>
                <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-end' onClick={handleNextBtn}>Next</button>
            </div>
        </div>
    );
}