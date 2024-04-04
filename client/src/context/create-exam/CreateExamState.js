import React, { useContext, useState } from 'react';
import CreateExamContext from "./createExamContext";
import { useNavigate } from 'react-router-dom';
import localStorageContext from '../local-storage/localStorageContext';
import axios from "axios";

const CreateExamState = (props) => {

    const createNewQuestionObject = () => {
        return {
            type: "mcq",
            subject: null,
            subjectId: -1,
            subtopic: null,
            subtopicId: -1,
            positiveMarks: 0,
            negativeMarks: 0,
            questionStatement: "",
            questionImageURL: null,
            optionAStatement: "",
            optionAImageURL: null,
            optionBStatement: "",
            optionBImageURL: null,
            optionCStatement: "",
            optionCImageURL: null,
            optionDStatement: "",
            optionDImageURL: null,
            solutionStatement: "",
            solutionImageURL: null,
            correctAnswer: [],
            isSaved: false
        };
    }

    const navigate = useNavigate();
    const { setExams, getExams } = useContext(localStorageContext);
    const [localStorageIndex, setLocalStorageIndex] = useState(null);
    const [page, setPage] = useState(1);
    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState(0);
    const [examDate, setExamDate] = useState("");
    const [examTime, setExamTime] = useState("");
    const [examQuestions, setExamQuestions] = useState([createNewQuestionObject()]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [candidateEmail, setCandidateEmail] = useState(new Set());

    const askBeforeReload = (e) => {
        e.preventDefault();
    }
    window.addEventListener("beforeunload", askBeforeReload);

    const createExam = async (data) => {
        const userID = 1;
        const response = await axios.post(`http://localhost:8080/api/exam/create-exam?userId=${userID}`, {
            title: data.examTitle,
            duration: data.examDuration,
            startDate: data.examDate,
            startTime: data.examTime,
            questionDtos: data.examQuestions,
            emailIds: data.candidateEmail
        });
        console.log("response: ", response.data);
        return response.data;
    }

    const validateData = () => {
        let isValid = true;
        let errorMsg = [];

        if (examTitle === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Title.");
        }
        if (examDuration < 10) {
            isValid = false;
            errorMsg.push("Please enter appropriate Exam Duration(i.e. greater than or equal to 10 mins).");
        }
        if (examDate === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Date.");
        }
        if (examTime === "") {
            isValid = false;
            errorMsg.push("Please enter Exam Start Time.");
        }
        if (candidateEmail.size === 0) {
            isValid = false;
            errorMsg.push("Please enter Email address of allowed candidates.");
        }
        examQuestions.map((question, index) => {
            if(!question.isSaved) {
                isValid = false;
                errorMsg.push(`Please save question number ${index + 1}.`);
            }
        });

        return {
            isValid: isValid,
            errorMsg: errorMsg
        };
    }

    const handlePrevPageBtn = (e) => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPageBtn = (e) => {
        if (page < 3) {
            setPage(page + 1);
        }
    }

    const handleSubmitBtn = async () => {
        const { isValid, errorMsg } = validateData();
        if (isValid) {
            const submitConfirm = window.confirm("Are sure to SUBMIT ?");
            if (submitConfirm) {
                const data = createExamObject();
                document.getElementById('main-div').classList.add('hidden');
                document.getElementById('loading-div').classList.remove('hidden');
                await createExam(data);
                if(localStorageIndex !== null) {
                    const allExams = getExams();
                    const newExams = [];
                    allExams.map((exam, i) => {
                        if (i !== localStorageIndex) {
                            newExams.push(exam);
                        }
                    });
                    setExams(newExams);
                }
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

    const createExamObject = () => {
        return {
            examTitle: examTitle,
            examDuration: examDuration,
            examDate: examDate,
            examTime: examTime,
            examQuestions: examQuestions,
            candidateEmail: [...candidateEmail]
        };
    }

    const handleSaveToLocal = () => {
        let allExams = getExams();
        if(allExams === null) {
            allExams = [];
        }
        const dataToSave = createExamObject();
        dataToSave.lastModifiedDate = new Date(Date.now());
        if (localStorageIndex === null) {
            setLocalStorageIndex(0);
            allExams.push(dataToSave);
        } else {
            allExams[localStorageIndex] = dataToSave;
        }
        setExams(allExams);
        console.log("save to local ...", allExams);
    }

    const fetchFromLocalStorage = (localIndex) => {
        const allExams = getExams();
        const reqExam = allExams[localIndex];
        console.log("all exams on fetch: ", allExams);
        console.log("index: ", localIndex);

        setExamTitle(reqExam.examTitle);
        setExamDuration(reqExam.examDuration);
        setExamDate(reqExam.examDate);
        setExamTime(reqExam.examTime);
        setExamQuestions(reqExam.examQuestions);
        setCandidateEmail(reqExam.candidateEmail);

        console.log("from local storage: ", reqExam);
    }

    return (
        <CreateExamContext.Provider value={{
            page,
            examTitle,
            examDuration,
            examDate,
            examTime,
            examQuestions,
            questionIndex,
            candidateEmail,
            setExamTitle,
            setExamDuration,
            setExamDate,
            setExamTime,
            setExamQuestions,
            setQuestionIndex,
            setCandidateEmail,
            createNewQuestionObject,
            createExamObject,
            handlePrevPageBtn,
            handleNextPageBtn,
            handleSubmitBtn,
            handleSaveToLocal,
            setLocalStorageIndex,
            fetchFromLocalStorage
        }}>
            {props.children}
        </CreateExamContext.Provider>
    );
};

export default CreateExamState;