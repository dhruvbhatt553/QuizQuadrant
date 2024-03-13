import React, { useState } from 'react';

export default function ExamPage(props) {

    const maxViolation = 5;
    const [examStart, setExamStart] = useState(false);
    const [examFinish, setExamFinish] = useState(props.examData.finished);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [violation, setViolation] = useState(0);
    const [examData, setExamData] = useState(props.examData);
    const [questionData, setQuestionData] = useState(null);
    const [markedAnswer, setMarkedAnswer] = useState([]);

    const fetchQuestionData = (id) => {
        // TODO API call for fetching data ...
        let flag = true;
        const data = props.questionData;

        // After data has arrived ...
        setQuestionData(data);
        console.log("request to fetch question: " + id);

        return flag;
    }

    const finishExam = () => {
        // TODO API call to submit exam data ...
        const flag = true;
        return flag;
    }

    const handleInstructionRead = (e) => {
        if(e.target.checked) {
            document.getElementById("startExamBtn").classList.remove("hidden");
        } else {
            document.getElementById("startExamBtn").classList.add("hidden");
        }
    }

    const checkViolationLimit = () => {
        // TODO issue: immediate changed state value of violation ...
        if(violation < maxViolation) {
            // window.alert(`You have violated the examination rules.If your violation count exceeds ${maxViolation}, your examination will end & you will not be able to resume your exam again !!!`);
        } else {
            let flag = false;
            while(!flag) {
                flag = finishExam();
            }
            setExamFinish(flag);
        }
    }

    const handleFullScreenViolation = () => {
        if(document.fullscreenElement === null) {
            setViolation((violation) => (violation + 1));
            checkViolationLimit();
        }
    }
    
    const handleTabChangeViolation = () => {
        if(document.hidden) {
            setViolation((violation) => (violation + 1));
            checkViolationLimit();
        }
    }

    const handleStartExamBtn = () => {
        setExamStart(true);
        const flag = fetchQuestionData(examData.questionID[0]);

        const screen = document.documentElement;
        if (screen.requestFullscreen) {
            screen.requestFullscreen();
        } else if (screen.webkitRequestFullscreen) { /* Safari */
            screen.webkitRequestFullscreen();
        } else if (screen.msRequestFullscreen) { /* IE11 */
            screen.msRequestFullscreen();
        }
        document.addEventListener("fullscreenchange", handleFullScreenViolation);
        document.addEventListener("visibilitychange", handleTabChangeViolation);

        Array(...document.getElementsByClassName("show-before-start")).map((element) => {
            element.classList.add("hidden");
        });
        Array(...document.getElementsByClassName("show-after-start")).map((element) => {
            element.classList.remove("hidden");
        });
    }

    const handleOptionSelection = (e) => {
        const newAns = new Set(markedAnswer);
        if(questionData.questionType === "mcq") {
            newAns.clear();
            newAns.add(e.target.value);
        } else {
            if(e.target.checked) {
                newAns.add(e.target.value);
            } else {
                newAns.delete(e.target.value);
            }
        }
        setMarkedAnswer(Array.from(newAns));
        console.log(newAns);
    }

    const handleClearSelectionBtn = () => {
        document.getElementsByName("option").forEach((option) => {
            option.checked = false;
        });
    }

    const handleQuestionNumberBtn = (e) => {
        let index = Number(e.target.value);
        const flag = fetchQuestionData(examData.questionID[index]);
        if(flag) {
            setQuestionIndex(index);
        }
        console.log(typeof index);
    }

    const handlePrevBtn = () => {
        console.log("prev");
        if(questionIndex > 0) {
            let index = questionIndex;
            index--;
            const flag = fetchQuestionData(examData.questionID[index]);
            if(flag) {
                setQuestionIndex(index);
            }
        }
    }

    const handleNextBtn = () => {
        console.log("next");
        if(questionIndex < (examData.questionID.length - 1)) {
            let index = questionIndex;
            index++;
            const flag = fetchQuestionData(examData.questionID[index]);
            if(flag) {
                setQuestionIndex(index);
            }
        }
    }

    const handleSaveBtn = () => {
        // TODO API call to save answer ...
        console.log("save");
    }

    const handleFinishExamBtn = () => {
        // TODO issue: when confirm box shows up, full screen is exited ...
        const submitConfirm = window.confirm("Are you sure you want to SUBMIT the exam ?");
        if(submitConfirm) {
            const flag = finishExam();
            if(flag) {
                setExamFinish(flag);
                console.log("FINISH EXAM");
                document.removeEventListener("fullscreenchange", handleFullScreenViolation);
                document.removeEventListener("visibilitychange", handleTabChangeViolation);
            } else {
                // TODO Alert for submit failure try again ...
            }
        }
    }

    const showMenu = () => {
        document.getElementById("rightDiv").classList.remove("hidden");
        document.getElementById("rightDiv").classList.add("absolute");
        document.getElementById("rightDiv").classList.add("top-12");
    };

    const hideMenu = () => {
        document.getElementById("rightDiv").classList.add("hidden");
        document.getElementById("rightDiv").classList.remove("absolute");
        document.getElementById("rightDiv").classList.remove("top-12");
    };

    return (
        <>
            <div className={`w-full h-screen ${examFinish ? "hidden" : ""} absolute top-0`}>
                <div id='leftDiv' className='w-full lg:w-3/4 h-full float-start'>
                    <div id='titleDiv' className='w-full h-12 flex items-center px-3 bg-gray-400'>
                        <div className='w-full grid grid-cols-4'>
                            <h1 className='col-span-3 text-left font-bold'>{examData.examName}</h1>
                            <h1 className='col-span-1 text-right font-semibold'>
                                <span>Time Remaining: </span>
                                <span>122</span>
                                <span> min</span>
                                <span> | </span>
                                <span>23</span>
                                <span> sec</span>
                            </h1>
                        </div>
                    </div>
                    <div id='instructionDiv' className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] px-5 py-3 overflow-auto text-left show-before-start'>
                        <h1 className='text-xl font-bold text-center mb-3'>INSTRUCTIONS</h1>
                        <h1 className='font-bold'>Read the instructions carefully before starting the exam:</h1>
                        <ul className='list-disc ml-5 my-3'>
                            <li className='my-2'>The duration of the examination is <b>{examData.totalTime}</b> minutes. The clock will be set on the server. The countdown timer at the top right-hand corner of your screen displays the time available for you to complete the examination.</li>
                            <li className='my-2'>When the timer reaches zero, the examination will end automatically. If you want, you can press <b>FINISH EXAM</b> button to end the exam.</li>
                            <li className='my-2'>To navigate to a question, click on the question number in the Question Palette. This does <b>NOT</b> save your answer to the current question.</li>
                            <li className='my-2'>Each MCQ/MSQ has four options. Clicking on an option will select it and clicking on it again will unselect it. For MCQ, only one option can be selected at any time. For MSQ, more than one option can be selected. Clicking the <b>Clear</b> button will clear all selected options for that question.</li>
                            <li className='my-2'>Click on <b>Save</b> to save your answer to the current question</li>
                            <li className='my-2'>Each question carries certain marks, as specified. Questions that are not attempted will result in ZERO marks. Wrong answers may lead to Negative Marking as specified.</li>
                            <li className='my-2'>Exam will start in full screen mode. If you exit from full screen mode, it will cause a violation count.</li>
                            <li className='my-2'>If you try to switch between tabs, it will also cause violation count.</li>
                            <li className='my-2'>If the violation count becomes more than <b>5</b>, your exam will automatically end and you will not be able to resume the exam again.</li>
                        </ul>
                        <input type='checkbox' id='instructionRead' className='col-start-1 justify-self-start' onClick={(e) => { handleInstructionRead(e) }} />
                        <label htmlFor='instructionRead' className='col-start-2 mx-2 font-semibold justify-self-start'>I have read the instructions carefully and want to proceed to the examination.</label>
                    </div>
                    <div id='questionDiv' className='w-full h-[calc(100%-16rem)] lg:h-[calc(100%-6rem)] px-5 py-3 overflow-auto text-left hidden show-after-start'>
                        {
                            examStart === true ? 
                            (<>
                                <div className='text-right font-bold'>
                                    <p>
                                        <span className='me-2 bg-green-500 px-3 py-1 rounded-full'>
                                            <span>Max Marks: </span>
                                            <span>{questionData.maxMarks}</span>
                                        </span>
                                        <span className='ms-2 bg-red-500 px-3 py-1 rounded-full'>
                                            <span>Negative Marks: </span>
                                            <span>{questionData.negativeMarks}</span>
                                        </span>
                                    </p>
                                </div>
                                <div id='queTextDiv' className='my-2'>
                                    <p>{questionData.questionText}</p>
                                </div>
                                <div id='queImageDiv' className='grid'>
                                    <img src={questionData.questionImage} className='justify-self-center' />
                                </div>
                                <div id='optionDiv' className='b-purple-200 my-2 mt-10'>
                                    {
                                        questionData.options.map((option, index) => {
                                            return (
                                                <div key={index} id={`optionDiv${index}`} className='flex p-2 my-2 border-gray-400 border-2 rounded-md'>
                                                    <div className='grid items-center m-3'>
                                                        <input type={questionData.questionType === "mcq" ? "radio" : "checkbox"} id={`option${index}`} name='option' value={String.fromCharCode(65 + index)} className='' onClick={(e) => { handleOptionSelection(e) }} />
                                                    </div>
                                                    <div className='grid items-center'>
                                                        <label htmlFor={`option${index}`}>
                                                            <p>{questionData.options[index].optionText}</p>
                                                            <img src={questionData.options[index].optionImage} />
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </>) : 
                            <></>
                        }
                    </div>
                    <div id='navigationDiv' className='w-full h-52 lg:h-12 flex items-center px-3 bg-gray-400'>
                        <div className='w-full hidden show-after-start'>
                            <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-start' onClick={handlePrevBtn}>Prev</button>
                            <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center' onClick={handleClearSelectionBtn}>Clear</button>
                            <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-center' onClick={handleSaveBtn}>Save</button>
                            <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mx-2 my-1 font-bold text-white lg:justify-self-end' onClick={handleNextBtn}>Next</button>
                        </div>
                        <div className='h-full py-2'>
                            <button id='showMenuBtn' className='bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold text-white rounded-lg px-2 ml-3 h-full lg:hidden' onClick={showMenu}>&lt;</button>
                        </div>
                    </div>
                </div>
                <div id='rightDiv' className='w-full h-[calc(100%-6rem)] lg:w-1/4 lg:h-full float-end hidden lg:block bg-gray-300 border-black lg:border-l-4'>
                    <div className='lg:hidden p-1 h-12'>
                        <button id='hideMenuBtn' className='bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 font-bold text-white' onClick={hideMenu}>Hide Menu</button>
                    </div>
                    <div id='studentInfoDiv' className='w-full flex h-[calc(20%)]'>
                        <div className='w-full'>
                            <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>Name: {examData.candidateName}</h1>
                            <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>Email: {examData.candidateEmail}</h1>
                            <h1 className='h-1/3 px-3 flex items-center border-black border-b-4 font-bold'>Violations Count: {violation}</h1>
                        </div>
                    </div>
                    {/* <div id='questionStatusDiv' className='flex w-full h-1/6 border-black border-t-4'>
                        <div className='w-full'>
                            <div className='h-1/3 w-full p-1 flex px-3'>
                                <div className='h-full aspect-square bg-gray-500 rounded-full'></div>
                                <h1 className='grid items-center ms-3'>X - Unvisited</h1>
                            </div>
                            <div className='h-1/3 w-full p-1 flex px-3'>
                                <div className='h-full aspect-square bg-green-500 rounded-full'></div>
                                <h1 className='grid items-center ms-3'>X - Answered</h1>
                            </div>
                            <div className='h-1/3 w-full p-1 flex px-3'>
                                <div className='h-full aspect-square bg-red-600 rounded-full'></div>
                                <h1 className='grid items-center ms-3'>X - Not Answered</h1>
                            </div>
                        </div>
                    </div> */}
                    <div id='questionNumberDiv' className='w-full h-[calc(70%)] border-black border-b-4 overflow-auto hidden show-after-start'>
                        {
                            examStart === true ? 
                            (<div className='w-full grid grid-cols-5 gap-3 p-3'>
                                {
                                    examData.questionID.map((element, index) => {
                                        return (
                                            <button key={element} value={index} className={`w-full aspect-square place-self-center rounded-full cursor-pointer text-white font-bold grid items-center hover:bg-blue-900 ${questionIndex === index ? "bg-black" : "bg-blue-700"}`} onClick={(e) => { handleQuestionNumberBtn(e) }}>{index + 1}</button>
                                        );
                                    })
                                }
                            </div>) : 
                            <></>
                        }
                    </div>
                    <div className='w-full h-[calc(10%)] grid justify-items-stretch px-3 py-2'>
                        <button id='finishExamBtn' className='bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white hidden show-after-start' onClick={handleFinishExamBtn}>FINISH EXAM</button>
                        <button id='startExamBtn' className='bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white hidden show-before-start' onClick={handleStartExamBtn}>Start Exam</button>
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen grid items-center ${examFinish ? "" : "hidden"}`}>
                <div>
                    <h1 className='text-3xl font-bold text-red-700 my-5'>Exam finished !!!</h1>
                    <button className='bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 my-1 font-bold text-white'>Return to Home Page</button>
                </div>
            </div>
        </>
    );
};