import React from 'react';

export default function Subtopics({ name }) {
    return (
        <button className='text-lg hover:underline hover:font-bold hover:text-red-700'>
        {name}
        </button>
    );
};