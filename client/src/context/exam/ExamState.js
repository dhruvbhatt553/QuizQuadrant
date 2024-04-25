import React, { useContext, useState } from 'react';
import ExamContext from './examContext';
import { q1, q2, q3, q4, q5, q6, q7, q8, q9 } from './../../dummy-data/examData';
import axios from "axios";
import localStorageContext from "../local-storage/localStorageContext";
import authContext from "../auth/authContext";

const ExamState = (props) => {

    const { getToken } = useContext(localStorageContext);
    const maxViolation = 5;
    const [instructionRead, setInstructionRead] = useState(false);
    const [examStart, setExamStart] = useState(false);
    const [examFinish, setExamFinish] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [examData, setExamData] = useState(null);
    const [allQuestions, setAllQuestions] = useState(null);
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
    const [currQuestionData, setCurrQuestionData] = useState(null);
    const [remainingMin, setRemainingMin] = useState(0);
    const [remainingSec, setRemainingSec] = useState(0);
    const [mockResult, changeMockResult] = useState(null);
    const { user } = useContext(authContext);

    const rotateArray = (examId, arr) => {
        console.log("rotate: ", arr);
        const rotationFactor = user.userId + examId + 1157;
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

    const fetchExamData = async (examId) => {
        const userId = user.userId;
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/get-exam-by-id?userId=${userId}&examId=${examId}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        )
        console.log("response for exam:", response);
        const questionArray = [];
        response.data.questionIds = rotateArray(response.data.id, response.data.questionIds);
        response.data.questionIds.map((questionId) => {
            questionArray.push(null);
        });
        setExamData(response.data);
        setAllQuestions(questionArray);
        return response.data;
    };

    const fetchMockExamData = async (mockExam) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mock-test/get-question-Ids?total=${mockExam.total}`, {
            subtopicDtos: mockExam.subtopics
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        );
        console.log("response for mock exam:", response.data);
        const questionArray = [];
        const fetchedArray = rotateArray(89, response.data.qids);
        fetchedArray.map((questionId) => {
            questionArray.push(null);
        });
        const currDate = new Date();
        const mockExamData = {
            id: null,
            title: mockExam.title,
            duration: mockExam.duration,
            startDate: currDate.getFullYear() + "-" + currDate.getMonth() + "-" + currDate.getDay(),
            startTime: currDate.getHours() + ":" + currDate.getMinutes(),
            candidateName: "asasasasas",
            candidateEmail: "ckncdhc",
            questionIds: fetchedArray,
            isMockTest: true,
            totalMarks: response.data.totalMarks
        };
        setExamData(mockExamData);
        setAllQuestions(questionArray);
        return mockExamData;
    }

    const fetchQuestionData = async () => {
        let userId = user.userId;
        let data = allQuestions[currQuestionIndex];
        if (data === null) {
            const questionId = examData.questionIds[currQuestionIndex];
            let response;
            // console.log("dkcndhcbdbcd",isMockTest);
            if (examData.isMockTest) {
                response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/question/get-question-by-id?questionID=${questionId}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
                )
                console.log(`${process.env.REACT_APP_API_BASE_URL}/question/get-question-by-id?questionID=${questionId}`);
            } else {
                console.log("private question api ...");
                response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/get-question-by-id?userId=${userId}&questionId=${questionId}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
                );
            }
            data = response.data;
            console.log("response for question:", data);
            data.options = rotateArray(response.data.id ? response.data.id : 89, data.options);
            const newArray = [...allQuestions];
            newArray[currQuestionIndex] = data;
            setAllQuestions(newArray);
            console.log("request to fetch question with id: " + questionId);
        }
        setCurrQuestionData(data);
        return data;
    }

    const finishExam = async (data) => {
        document.removeEventListener("fullscreenchange", handleFullScreenViolation);
        document.removeEventListener("visibilitychange", handleTabChangeViolation);
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
        if (!data.isMockTest) {
            const userId = user.userId;
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/finish-exam?userId=${userId}&examId=${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            );
            console.log(response.data);
        }
        setExamFinish((examFinish) => {
            return true;
        });
    }

    const handleInstructionRead = (e) => {
        setInstructionRead((instructionRead) => (!instructionRead));
    }

    const handleViolationLimitExceed = async (data) => {
        console.log("violation limit exceed ...");
        await finishExam(data);
    }

    const handleFullScreenViolation = async (data) => {
        if (document.fullscreenElement === null) {
            setViolationCount((violationCount) => {
                if (violationCount >= maxViolation) {
                    const tempFunc = async () => {
                        await handleViolationLimitExceed(data);
                    }
                    tempFunc();
                }
                return (violationCount + 1);
            });
            // window.alert("kasfv khdfv");
            // enterFullScreen();
        }
    }

    const handleTabChangeViolation = async (data) => {
        if (document.hidden) {
            setViolationCount((violationCount) => {
                if (violationCount >= maxViolation) {
                    const tempFunc = async () => {
                        await handleViolationLimitExceed(data);
                    }
                    tempFunc();
                }
                return (violationCount + 1);
            });
        }
    }

    const handleStartExamBtn = () => {
        setExamStart(true);
        enterFullScreen();
        addEventListeners(examData);
    }

    const enterFullScreen = () => {
        const screen = document.documentElement;
        if (screen.requestFullscreen) {
            screen.requestFullscreen();
        } else if (screen.webkitRequestFullscreen) { /* Safari */
            screen.webkitRequestFullscreen();
        } else if (screen.msRequestFullscreen) { /* IE11 */
            screen.msRequestFullscreen();
        }
    }

    const handleFinishExamBtn = async () => {
        // TODO issue: when confirm box shows up, full screen is exited ...
        const submitConfirm = window.confirm("Are you sure you want to SUBMIT the exam ?");
        if (submitConfirm) {
            let flag = false;
            if (!examData.isMockTest) {
                flag = await finishExam(examData);
            } else {
                flag = true;
                console.log("path selected for claculate mock result -------------------------------------------------->>>>>>>")
            }
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
        console.log("marked: ", newData.options[index]);
        if (currQuestionData.type === "mcq") {
            newData.options.map((option, i) => {
                option.isMarked = false;
            });
            newData.options[index].isMarked = true;
            console.log("mcq");
        } else {
            newData.options[index].isMarked = !newData.options[index].isMarked;
        }
        console.log(currQuestionData.options[0].isMarked, currQuestionData.options[1].isMarked, currQuestionData.options[2].isMarked, currQuestionData.options[3].isMarked);
        const newArr = [...allQuestions];
        newArr[currQuestionIndex] = newData;
        setCurrQuestionData(newData);
        setAllQuestions(newArr);
        return [newData.options[0].isMarked, newData.options[1].isMarked, newData.options[2].isMarked, newData.options[3].isMarked]
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
        setCurrQuestionIndex(index);
    }

    const handlePrevBtn = () => {
        console.log("prev");
        if (currQuestionIndex > 0) {
            setCurrQuestionIndex(currQuestionIndex - 1);
        }
    }

    const handleNextBtn = () => {
        console.log("next");
        if (currQuestionIndex < (examData.questionIds.length - 1)) {
            setCurrQuestionIndex(currQuestionIndex + 1);
        }
    }

    const handleSaveBtn = async () => {
        let responsesArr = [];
        currQuestionData.options.map((option) => {
            if (option.isMarked) {
                responsesArr.push(option.id);
            }
        });
        const userId = user.userId;
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/exam/store-response?userId=${userId}&privateQuestionId=${currQuestionData.id}`, {
            responses: responsesArr
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        );
        console.log("save response: ", response.data);
    }

    const handleSecRemaining = () => {
        setRemainingSec((remainingSec) => {
            return (remainingSec === 0 ? 59 : remainingSec - 1)
        });
        // console.log(remainingMin, remainingSec);
    }

    const handleMinRemaining = () => {
        setRemainingMin((remainingMin) => {
            return remainingMin - 1
        });
        console.log(remainingMin, remainingSec);
    }

    const startTimer = (data) => {
        const examStartTimeSplit = data.startTime.split(":");
        const currDate = new Date(Date.now());
        const minutesElapsed = ((currDate.getHours() - parseInt(examStartTimeSplit[0])) * 60) + (currDate.getMinutes() - parseInt(examStartTimeSplit[1]));
        const startMin = data.duration - minutesElapsed - 1;
        let startSec = 59;
        if (!data.isMockTest) {
            startSec = 60 - currDate.getSeconds();
        }
        setRemainingMin((remainingMin) => {
            return startMin
        });
        setRemainingSec((remainingSec) => {
            return startSec
        });
        console.log("timer start ...");
        setInterval(handleSecRemaining, 1000);
        setTimeout(() => {
            console.log("start min timer ...");
            setRemainingMin((remainingMin) => {
                return remainingMin - 1
            });
            setInterval(handleMinRemaining, 60000);
        }, (startSec + 1) * 1000);
        setTimeout(async () => {
            await finishExam(data);
        }, ((startMin * 60 * 1000) + (startSec * 1000)));
    }

    const addEventListeners = (data) => {
        document.addEventListener("fullscreenchange", async () => {
            await handleFullScreenViolation(data);
        });
        document.addEventListener("visibilitychange", async () => {
            await handleTabChangeViolation(data);
        });
    }

    const calculateMockTestResult = () => {
        let achievedMarks = 0, corrects = 0, incorrects = 0, concernedSubtopics = [];

        allQuestions.map((question) => {
            if (question !== null) {
                console.log("ALL OPTIONS", question.options);
                if (question.options[0].isMarked ||
                    question.options[1].isMarked ||
                    question.options[2].isMarked ||
                    question.options[3].isMarked) {
                    let temp = true;
                    question.options.map((option) => {
                        //  console.log("ckmdjckujnducjnidciujdvu",option,option.isCorrect === option.isMarked );
                        temp = (option.isCorrect === option.isMarked);
                    });
                    if (temp) {
                        corrects++;
                        achievedMarks += question.positiveMarks;
                        console.log(achievedMarks);
                    } else {
                        incorrects++;
                        achievedMarks += question.negativeMarks;
                        console.log(achievedMarks);
                        if (!concernedSubtopics.includes(question.subtopic))
                            concernedSubtopics.push(question.subtopic);
                    }
                }
            }
            console.log("mnshbdhbsdbhdfhjbdfbhdjbfjdhbf", achievedMarks);
        });

        const tempMockResult = {

            achievedMarks: achievedMarks,
            corrects: corrects,
            incorrects: incorrects,
            totalMarks: examData.totalMarks,
            concernedSubtopics: concernedSubtopics,
            totalQuestions: allQuestions.length
        }

        changeMockResult(tempMockResult);
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
                remainingMin,
                remainingSec,
                fetchExamData,
                fetchMockExamData,
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
                handleSaveBtn,
                startTimer,
                mockResult,
                calculateMockTestResult,
                addEventListeners
            }}
        >
            {props.children}
        </ExamContext.Provider>
    );
};

export default ExamState;