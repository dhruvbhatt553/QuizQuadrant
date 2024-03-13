import React, { useState } from 'react';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';

export default function CreateExam() {

    const [page, setPage] = useState(1);
    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState(10);
    const [examDate, setExamDate] = useState("");
    const [examTime, setExamTime] = useState("");
    const [examQuestions, setExamQuestions] = useState([{ type: "mcq", question: "", questionImage: "", optionA: "", optionAImage: "", optionB: "", optionBImage: "", optionC: "", optionCImage: "", optionD: "", optionDImage: "", correctAnswer: [""] }]);
    const [candidateEmail, setCandidateEmail] = useState(new Set());

    const askBeforeReload = (e) => {
        e.preventDefault();
    }
    window.addEventListener("beforeunload", askBeforeReload);

    const handlePrevPageBtn = (e) => {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPageBtn = (e) => {
        if(page < 3) {
            setPage(page + 1);
        }
    }

    const handleSubmitBtn = () => {
        const submitConfirm = window.confirm("Are sure to SUBMIT ?");
        if(submitConfirm) {
            const data = {
                examTitle: examTitle,
                examDuration: examDuration,
                examDate: examDate,
                examTime: examTime,
                examQuestions: examQuestions,
                candidateEmail: [...candidateEmail]
            };
            console.log("SUBMIT ...");
            console.log(data);
        }
    }

    return (
        <>
            <div className='w-full h-screen'>
                <div id='page-1' className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 1 ? "" : "hidden"}`}>
                    <Page1 examTitle={examTitle} setExamTitle={setExamTitle} examDuration={examDuration} setExamDuration={setExamDuration} examDate={examDate} setExamDate={setExamDate} examTime={examTime} setExamTime={setExamTime} />
                </div>
                <div id='page-2' className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 2 ? "" : "hidden"}`}>
                    <Page2 examQuestions={examQuestions} setExamQuestions={setExamQuestions} />
                </div>
                <div id='page-3' className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 3 ? "" : "hidden"}`}>
                    <Page3 candidateEmail={candidateEmail} setCandidateEmail={setCandidateEmail} />
                </div>
                <div id='navigation' className='w-full h-[calc(10%)] grid items-center px-10 bg-gray-200'>
                    <div>
                        <button id='prev' className={`float-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 1 ? "hidden" : ""}`} onClick={(e) => handlePrevPageBtn(e)}>Prev</button>
                        <button id='next' className={`float-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 3 ? "hidden" : ""}`} onClick={(e) => handleNextPageBtn(e)}>Next</button>
                        <button id='next' className={`float-end text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center ${page === 3 ? "" : "hidden"}`} onClick={(e) => handleSubmitBtn(e)}>Create Exam</button>
                    </div>
                </div>
            </div>
        </>
    );
};