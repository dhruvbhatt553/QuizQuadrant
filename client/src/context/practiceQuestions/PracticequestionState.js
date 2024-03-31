import React, { useState } from "react";
import PracticequestionContext from "./practicequestionContext";
import axios from "axios";

const PracticequestionState = (props) => {
    const [questions, setQuestions] = useState([]);

    const fetchPracticeQuestionsBySubject = (subjectId, pageNumber) => {
        axios.get(`http://localhost:8080/api/question/get-questions-by-subject?subjectId=${subjectId}&pageNumber=${pageNumber}`, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                console.log("response for pageNumber:", pageNumber, ": ", response.data);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const fetchPracticeQuestionsBySubtopic = (subjectId, subtopicId, pageNumber) => {
        axios.get(`http://localhost:8080/api/question/get-questions-by-subject?subjectId=${subjectId}&subtopicId=${subtopicId}&pageNumber=${pageNumber}`, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                // console.log(response.data);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <PracticequestionContext.Provider value={{ fetchPracticeQuestionsBySubject, fetchPracticeQuestionsBySubtopic, questions }}>
            {props.children}
        </PracticequestionContext.Provider>
    );
};

export default PracticequestionState;