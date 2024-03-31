import React, { useContext, useEffect } from 'react';
import data from './data';
import Subject from './Subject';
import subjectContext from '../../context/subject/subjectContext';

export default function Container() {

    const { subjects, fetchSubjects } = useContext(subjectContext);

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className='mt-3'>
            <span className='flex ms-2 text-orange-500 font-bold text-2xl'>Welcome to our website name </span>
            <span className='flex ms-2 font-light text-xl'>Practice mcqs,msqs topic wise and design tests effectively !</span>

            <div className='flex flex-wrap justify-center px-10 gap-10 py-4 '>
                {
                    subjects.map((item) => <Subject subject={item} />)
                }
            </div>

        </div>
    );
};