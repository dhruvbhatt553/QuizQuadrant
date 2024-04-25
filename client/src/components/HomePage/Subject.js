import React from 'react';
import Subtopics from './Subtopics';
import {Link} from "react-router-dom";

export default function Subject({ subject }) {
    return (
        <div className='shadow md:basis-1/3 sm:basis-0 py-4 px-6 border rounded-xl font-mono ' >
            <div className='font-extrabold text-2xl hover:underline hover:font-bold hover:text-red-700 cursor-pointer'>
                <Link
                    to={"/practice"}
                    state={{ bySubject: true, subject: subject, subtopic: null, total: subject.noq }}
                >
                    {subject.subjectName}
                </Link>
            </div>
            <div className='mt-6 ps-6 text-start'>
                <ul style={{ listStyleType: "circle"}}>
                    {
                        subject.subtopics.map((subtopic) => <li><Subtopics subtopic={subtopic} /></li>)
                    }
                </ul>
            </div>
        </div>
    );
};