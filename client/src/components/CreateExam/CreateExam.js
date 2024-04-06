import React, {useContext, useEffect, useState} from 'react';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';
import createExamContext from '../../context/create-exam/createExamContext';
import {useLocation, useNavigate} from 'react-router-dom';

export default function CreateExam() {

    const location = useLocation();
    const navigate = useNavigate();
    const { page, handlePrevPageBtn, handleNextPageBtn, handleSaveToLocal, handleSubmitBtn, setLocalStorageIndex, fetchFromLocalStorage } = useContext(createExamContext);


    useEffect(() => {
        if(location.state) {
            const {localIndex} = location.state;
            if (localIndex !== null) {
                setLocalStorageIndex(localIndex);
                fetchFromLocalStorage(localIndex);
            }
        }
    }, []);

    return (
        <>
            <div id='loading-div' className='w-full px-10 py-10 text-3xl text-center grid grid-cols-11 hidden'>
                <div className='col-start-6'>
                    <img src='images/loading.gif'/>
                    <h1 className='mt-10 text-red-700 font-medium'>Saving ...</h1>
                </div>
            </div>
            <div id='main-div' className='w-full h-full'>
                <div id='page-1'
                     className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 1 ? "" : "hidden"}`}>
                    <Page1 />
                </div>
                <div id='page-2'
                     className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 2 ? "" : "hidden"}`}>
                    <Page2 />
                </div>
                <div id='page-3'
                     className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 3 ? "" : "hidden"}`}>
                    <Page3 />
                </div>
                <div id='navigation' className='w-full h-[calc(10%)] grid items-center px-10 bg-gray-200'>
                    <div>
                        <button id='prev'
                                className={`float-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 1 ? "hidden" : ""}`}
                                onClick={(e) => handlePrevPageBtn(e)}>Prev
                        </button>
                        <button id='prev'
                                className={`float-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center`}
                                onClick={handleSaveToLocal}>Save to Local
                        </button>
                        <button id='next'
                                className={`float-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 3 ? "hidden" : ""}`}
                                onClick={(e) => handleNextPageBtn(e)}>Next
                        </button>
                        <button id='next'
                                className={`float-end text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 3 ? "" : "hidden"}`}
                                onClick={(e) => handleSubmitBtn(e)}>Create Exam
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};