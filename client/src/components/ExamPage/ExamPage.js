import React, { useEffect, useState } from 'react';
import TitleDiv from './TitleDiv';
import InstructionDiv from './InstructionDiv';
import QuestionDiv from './QuestionDiv';
import NavigationDiv from './NavigationDiv';
import UtilityDiv from './UtilityDiv';
import ExamFinishDiv from './ExamFinishDiv';
import { data, q1, q2, q3, q4, q5, q6, q7, q8, q9 } from './../../dummy-data/examData'

export default function ExamPage() {

    const maxViolation = 5;
    const [examStart, setExamStart] = useState(false);
    const [examFinish, setExamFinish] = useState(false);
    const [instructionRead, setInstructionRead] = useState(false);
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
    const [violationCount, setViolationCount] = useState(0);
    const [examData, setExamData] = useState({});
    const [currQuestionData, setCurrQuestionData] = useState(null);
    const [currQuestionMarkedAnswer, setCurrQuestionMarkedAnswer] = useState([]);

    const rotateArray = (arr) => {
     //   const rotationFactor = userId % examId;
     const rotationFactor = 2; 
     let count = rotationFactor % arr.length;
        let i = arr.length - 1;
        while(count > 0) {
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            count--;
            i--;
            console.log(count + " -> " + arr[0]);
        }
        return arr;
    }

    const fetchExamData = () => {
        data.questionIds = rotateArray(data.questionIds);
        setExamData(data);
    };

    const fetchQuestionData = (id) => {
        // TODO API call for fetching data ...
        let flag = true;

        // jugaadu logic ...
        let tempData = null;
        switch(id) {
            case 1:
                tempData = q1;
                break;
            case 2:
                tempData = q2;
                break;
            case 3:
                tempData = q3;
                break;
            case 4:
                tempData = q4;
                break;
            case 5:
                tempData = q5;
                break;
            case 6:
                tempData = q6;
                break;
            case 7:
                tempData = q7;
                break;
            case 8:
                tempData = q8;
                break;
            case 9:
                tempData = q9;
                break;
            default:
                tempData = q1;
        }

        tempData.options = rotateArray(tempData.options);

        // After data has arrived ...
        setCurrQuestionData(tempData);
        console.log("request to fetch question with id: " + id);

        return flag;
    }

    const finishExam = () => {
        // TODO API call to submit exam data ...
        const flag = true;
        return flag;
    }

    const handleInstructionRead = (e) => {
        setInstructionRead((instructionRead) => (!instructionRead));
    }

    const checkViolationLimit = () => {
        // TODO issue: immediate changed state value of violation ...
        if (violationCount < maxViolation) {
            // window.alert(`You have violated the examination rules.If your violation count exceeds ${maxViolation}, your examination will end & you will not be able to resume your exam again !!!`);
        } else {
            let flag = false;
            while (!flag) {
                flag = finishExam();
            }
            setExamFinish(flag);
        }
    }

    const handleFullScreenViolation = () => {
        if (document.fullscreenElement === null) {
            setViolationCount((violationCount) => (violationCount + 1));
            checkViolationLimit();
        }
    }

    const handleTabChangeViolation = () => {
        if (document.hidden) {
            setViolationCount((violation) => (violation + 1));
            checkViolationLimit();
        }
    }

    const handleStartExamBtn = () => {
        setExamStart(true);
        const flag = fetchQuestionData(examData.questionIds[0]);

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

    const handleFinishExamBtn = () => {
        // TODO issue: when confirm box shows up, full screen is exited ...
        const submitConfirm = window.confirm("Are you sure you want to SUBMIT the exam ?");
        if (submitConfirm) {
            const flag = finishExam();
            if (flag) {
                setExamFinish(flag);
                console.log("FINISH EXAM");
                document.removeEventListener("fullscreenchange", handleFullScreenViolation);
                document.removeEventListener("visibilitychange", handleTabChangeViolation);
            } else {
                // TODO Alert for submit failure try again ...
            }
        }
    }

    const handleOptionSelection = (e) => {
        const newAns = new Set(currQuestionMarkedAnswer);
        if (currQuestionData.questionType === "mcq") {
            newAns.clear();
            newAns.add(e.target.value);
        } else {
            if (e.target.checked) {
                newAns.add(e.target.value);
            } else {
                newAns.delete(e.target.value);
            }
        }
        setCurrQuestionMarkedAnswer(Array.from(newAns));
        console.log(newAns);
    }

    const handleClearSelectionBtn = () => {
        document.getElementsByName("option").forEach((option) => {
            option.checked = false;
        });
    }

    const handleQuestionNumberBtn = (e) => {
        let index = Number(e.target.value);
        const flag = fetchQuestionData(examData.questionIds[index]);

        if (flag) {
            setCurrQuestionIndex(index);
        }
    }

    const handlePrevBtn = () => {
        console.log("prev");
        if (currQuestionIndex > 0) {
            let index = currQuestionIndex;
            index--;
            const flag = fetchQuestionData(examData.questionIds[index]);
            if (flag) {
                setCurrQuestionIndex(index);
            }
        }
    }

    const handleNextBtn = () => {
        console.log("next");
        if (currQuestionIndex < (examData.questionIds.length - 1)) {
            let index = currQuestionIndex;
            index++;
            const flag = fetchQuestionData(examData.questionIds[index]);
            if (flag) {
                setCurrQuestionIndex(index);
            }
        }
    }

    const handleSaveBtn = () => {
        // TODO API call to save answer ...
        console.log("save");
    }


    useEffect(() => {
        fetchExamData();
    }, []);


    return (
        <>
            {
                !examFinish &&
                (
                    <div className='w-full h-screen absolute top-0'>
                        <div id='leftDiv' className='w-full lg:w-3/4 h-full float-start'>
                            <TitleDiv
                                duration={examData.duration}
                                title={examData.title}
                            />
                            {
                                !examStart &&
                                (
                                    <InstructionDiv
                                        duration={examData.duration}
                                        handleInstructionRead={handleInstructionRead}
                                    />
                                )
                            }
                            {
                                examStart &&
                                (
                                    <QuestionDiv
                                        examStart={examStart}
                                        currQuestionData={currQuestionData}
                                        handleOptionSelection={handleOptionSelection}
                                    />
                                )
                            }
                            {examStart && (<NavigationDiv />)}
                        </div>
                        <div id='rightDiv' className='w-full h-[calc(100%-6rem)] lg:w-1/4 lg:h-full float-end hidden lg:block bg-gray-300 border-black lg:border-l-4'>
                            <UtilityDiv
                                candidateName={examData.candidateName}
                                candidateEmail={examData.candidateEmail}
                                questionIds={examData.questionIds}
                                currQuestionIndex={currQuestionIndex}
                                violationCount={violationCount}
                                examStart={examStart}
                                instructionRead={instructionRead}
                                handleQuestionNumberBtn={handleQuestionNumberBtn}
                                handleStartExamBtn={handleStartExamBtn}
                                handleFinishExamBtn={handleFinishExamBtn}
                            />
                        </div>
                    </div>
                )
            }
            {examFinish && (<ExamFinishDiv />)}
        </>
    );
};