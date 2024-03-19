import React, { useState } from 'react';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';
import { useNavigate } from 'react-router-dom';

export default function CreateExam(props) {

    const navigate = useNavigate();
    const { subjectwiseTopics } = props;

    const [page, setPage] = useState(1);
    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState(0);
    const [examDate, setExamDate] = useState("");
    const [examTime, setExamTime] = useState("");
    const [examQuestions, setExamQuestions] = useState([{ type: "mcq", subject: "", subtopic: "", positiveMarks: 0, negativeMarks: 0, question: "", questionImage: "", optionA: "", optionAImage: "", optionB: "", optionBImage: "", optionC: "", optionCImage: "", optionD: "", optionDImage: "", solution: "", solutionImage: "", correctAnswer: [] }]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [unsaved, setUnsaved] = useState(true);
    const [candidateEmail, setCandidateEmail] = useState(new Set());

    const sleep = async (ms) => {
        await (new Promise(resolve => setTimeout(resolve, ms)));
    }

    const askBeforeReload = (e) => {
        e.preventDefault();
    }
    window.addEventListener("beforeunload", askBeforeReload);

    const createExam = async (data) => {
        // TODO API call to save data ...
        await sleep(2000);
        console.log(data);
    }

    const validateData = () => {
        let isValid = true;
        let errorMsg = [];

        if(examTitle === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Title.");
        }
        if(examDuration < 10) {
            isValid = false;
            errorMsg.push("Please enter appropriate Exam Duration(i.e. greater than or equal to 10 mins).");
        }
        if(examDate === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Date.");
        }
        if(examTime === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Start Time.");
        } 
        if(unsaved) {
            isValid = false;
            errorMsg.push(`Please save the unsaved question number: ${questionIndex + 1}.`);
        }
        if(candidateEmail.size === 0) {
            isValid = false;
            errorMsg.push("Please enter Email address of allowed candidates.");
        }

        return {
            isValid: isValid,
            errorMsg: errorMsg
        };
    }

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

    const handleSubmitBtn = async () => {
        const { isValid, errorMsg } = validateData();
        if(isValid) {
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
                document.getElementById('main-div').classList.add('hidden');
                document.getElementById('loading-div').classList.remove('hidden');
                await createExam(data);
                navigate("/");
            }
        } else {
            let errorStr = "";
            errorMsg.forEach((msg, index) => {
                errorStr += (index + 1) + ". " + msg + "\n";
            });
            window.alert(errorStr);
        }
    }

    return (
        <>
            <div id='loading-div' className='w-full px-10 py-10 text-3xl text-center grid grid-cols-11 hidden'>
                <div className='col-start-6'>
                    <img src='images/loading.gif' />
                    <h1 className='mt-10 text-red-700 font-medium'>Saving ...</h1>
                </div>
            </div>
            <div id='main-div' className='w-full h-full'>
                <div id='page-1' className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 1 ? "" : "hidden"}`}>
                    <Page1 examTitle={examTitle} setExamTitle={setExamTitle} examDuration={examDuration} setExamDuration={setExamDuration} examDate={examDate} setExamDate={setExamDate} examTime={examTime} setExamTime={setExamTime} />
                </div>
                <div id='page-2' className={`w-full h-[calc(90%)] flex justify-center overflow-auto ${page === 2 ? "" : "hidden"}`}>
                    <Page2 examQuestions={examQuestions} setExamQuestions={setExamQuestions} subjectwiseTopics={subjectwiseTopics} unsaved={unsaved} setUnsaved={setUnsaved} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} />
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