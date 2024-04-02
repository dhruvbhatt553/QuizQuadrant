import React, { useState } from "react";
import axios from "axios";
import singlepracticequestionContext from "./singlepracticequestioncontext";

const PracticequestionState = (props) => {
    const [question, setQuestion] = useState([]);

    const fetchPracticeQuestionsBySubject = (subjectId, total) => {
        axios.post(`http://localhost:8080/api/mock-test/get-questions?total=${total}`, {
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