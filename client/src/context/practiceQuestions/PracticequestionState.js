import React, { useState } from "react";
import PracticequestionContext from "./practicequestionContext";
import axios from "axios";
import localStorageContext from "../local-storage/localStorageContext";

const PracticequestionState = (props) => {
    const [questions, setQuestions] = useState([]);

    const fetchPracticeQuestionsBySubject = async (subjectId, pageNumber) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/question/get-questions-by-subject?subjectId=${subjectId}&pageNumber=${pageNumber}`)
        console.log("response for pageNumber:", pageNumber, ": ", response.data);
        setQuestions(response.data);
        return response.data;
    };

    const fetchPracticeQuestionsBySubtopic = async (subjectId, subtopicId, pageNumber) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/question/get-questions-by-subtopic?subjectId=${subjectId}&subtopicId=${subtopicId}&pageNumber=${pageNumber}`)
        console.log("response for pageNumber:", pageNumber, ": ", response.data);
        setQuestions(response.data);
        return response.data;
    };

    return (
        <PracticequestionContext.Provider value={{ fetchPracticeQuestionsBySubject, fetchPracticeQuestionsBySubtopic, questions }}>
            {props.children}
        </PracticequestionContext.Provider>
    );
};

export default PracticequestionState;