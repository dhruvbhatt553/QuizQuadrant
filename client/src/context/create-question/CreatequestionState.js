import React, {useContext, useState} from 'react';
import axios from 'axios';
import CreateQuestionContext from "./createquestionContext";
import localStorageContext from "../local-storage/localStorageContext";

const CreateQuestionState = (props) => {

    const {getToken} = useContext(localStorageContext);

    const createQuestion = async (question) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/question/create-question`, question, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        );
        console.log("response: ", response.data);
        return response.data;
    };

    return (
        <CreateQuestionContext.Provider value={{ createQuestion }}>
            {props.children}
        </CreateQuestionContext.Provider>
    );
};

export default CreateQuestionState;