import React from "react";

export default function Page1(props) {

    const { examTitle, setExamTitle, examDuration, setExamDuration, examDate, setExamDate, examTime, setExamTime } = props;
    
    const editExamTitle = (e) => {
        setExamTitle(e.target.value);
    }

    const editExamDuration = (e) => {
        setExamDuration(e.target.value);
    }

    const editExamDate = (e) => {
        setExamDate(e.target.value);
    }

    const editExamTime = (e) => {
        setExamTime(e.target.value);
    }

    return (
        <>
            <div className='w-3/4 h-full text-left text-xl'>
                <div className='w-full my-5'>
                    <label htmlFor='examTitle' className='block font-medium mb-2'>Exam Title: </label>
                    <input type='text' name='examTitle' id='examTitle' value={examTitle} onChange={editExamTitle} className='w-full bg-gray-200 rounded-lg border-black border-2 px-3 py-2 focus:shadow-xl' />
                </div>
                <div className='w-full my-5 grid grid-cols-3'>
                    <div className='me-3'>
                        <label htmlFor='examDuration' className='block font-medium mb-2'>Exam Duration (Minutes):</label>
                        <input type='number' min={10} name='examDuration' id='examDuration' value={examDuration} onChange={editExamDuration} className='w-full bg-gray-200 rounded-lg border-black border-2 px-3 py-2 focus:shadow-xl' />
                    </div>
                    <div className='mx-3'>
                        <label htmlFor='examDate' className='block font-medium mb-2'>Exam Date:</label>
                        <input type='date' min={new Date().toJSON().slice(0, 10)} name='examDate' id='examDate' value={examDate} onChange={editExamDate} className='w-full bg-gray-200 rounded-lg border-black border-2 px-3 py-2 focus:shadow-xl' />
                    </div>
                    <div className='ms-3'>
                        <label htmlFor='examTime' className='block font-medium mb-2'>Start Time: </label>
                        <input type='time' name='examTime' id='examTime' value={examTime} onChange={editExamTime} className='w-full bg-gray-200 rounded-lg border-black border-2 px-3 py-2 focus:shadow-xl' />
                    </div>
                </div>
            </div>
        </>
    );
}