import React, {useState} from 'react';
import axios from 'axios';
import CreateQuestionContext from "./createquestionContext";

const CreateQuestionState = (props) => {

    const createQuestion = async (question) => {
        const response = await axios.post(`http://localhost:8080/api/question/create-question`, question)
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