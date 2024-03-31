import React, { useState } from 'react';
import ExamContext from './examContext';
import { data, q1, q2, q3, q4, q5, q6, q7, q8, q9 } from './../../dummy-data/examData';

const ExamState = (props) => {

    const maxViolation = 5;
    const [instructionRead, setInstructionRead] = useState(false);
    const [examStart, setExamStart] = useState(false);
    const [examFinish, setExamFinish] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [examData, setExamData] = useState(null);
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
    const [currQuestionData, setCurrQuestionData] = useState(null);

    const rotateArray = (arr) => {
        const userId = 1;   // hardcoded temp ...
        const examId = 1;   // hardcoded temp ...
        const rotationFactor = userId % examId;
        let count = rotationFactor % arr.length;
        let i = arr.length - 1;
        while (count > 0) {
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
        switch (id) {
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

    const handleOptionSelection = (index) => {
        const newData = new Object(currQuestionData);
        if (currQuestionData.type === "mcq") {
            newData.options.map((option) => {
                option.isMarked = false;
            });
            newData.options[index].isMarked = true;
            console.log("mcq");
        } else {
            newData.options[index].isMarked = !newData.options[index].isMarked;
        }
        console.log(currQuestionData.options[0].isMarked, currQuestionData.options[1].isMarked, currQuestionData.options[2].isMarked, currQuestionData.options[3].isMarked);
        setCurrQuestionData(newData);
    }

    const handleClearSelectionBtn = () => {
        console.log("clear");
        const newData = new Object(currQuestionData);
        newData.options.map((option) => {
            option.isMarked = false;
        });
        setCurrQuestionData(newData);
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

    return (
        <ExamContext.Provider
            value={{
                instructionRead,
                examStart,
                examFinish,
                violationCount,
                examData,
                currQuestionIndex,
                currQuestionData,
                fetchExamData,
                fetchQuestionData,
                finishExam,
                handleInstructionRead,
                handleStartExamBtn,
                handleFinishExamBtn,
                handleOptionSelection,
                handleClearSelectionBtn,
                handleQuestionNumberBtn,
                handlePrevBtn,
                handleNextBtn,
                handleSaveBtn
            }}
        >
            {props.children}
        </ExamContext.Provider>
    );
};

export default ExamState;