import React from 'react';
import Subtopics from './Subtopics';


export default function Subject({ subject }) {
    return (
        <div className='shadow md:basis-1/3 sm:basis-0 py-4 px-6 border rounded-xl font-mono ' >
            <div className='font-extrabold text-xl'>
                {subject.title}
            </div>
            <div className='mt-6 text-start'>
                <ul style={{ listStyleType: "circle" }}>
                    {
                        subject.subtopics.map((item1) => <li><Subtopics name={item1} /></li>)
                    }
                </ul>
            </div>
        </div>
    );
};