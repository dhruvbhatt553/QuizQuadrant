import React, { useState } from "react";
import axios from "axios";
import ResultContext from "./resultContext";

const ResultState = (props) => {

    const fetchLeaderboard = async (examID) => {
        const response = await axios.get(`http://localhost:8080/api/exam/get-leaderboard?examId=${examID}`)
        console.log("response : ", response.data);
        return response.data;
    };

    const fetchResult = async (examID) => {
        const response = await axios.get(`http://localhost:8080/api/exam/get-all-result?examId=${examID}`)
        console.log("response : ", response.data);
        return response.data;
    };

    return (
        <ResultContext.Provider value={{ fetchResult, fetchLeaderboard }}>
            {props.children}
        </ResultContext.Provider>
    );
};

export default ResultState;