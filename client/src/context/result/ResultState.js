import React, {useContext, useState} from "react";
import axios from "axios";
import ResultContext from "./resultContext";
import localStorageContext from "../local-storage/localStorageContext";

const ResultState = (props) => {

    const {getToken} = useContext(localStorageContext);

    const fetchLeaderboard = async (examID) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/get-leaderboard?examId=${examID}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        );
        console.log("response : ", response.data);
        return response.data;
    };

    const fetchResult = async (examID) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/get-all-result?examId=${examID}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        );
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