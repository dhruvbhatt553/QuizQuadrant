import React, { useState } from 'react';
import LocalStorageContext from './localStorageContext';

const LocalStorageState = (props) => {

    const setExams = (exams) => {
        localStorage.setItem("savedExams", JSON.stringify(exams));
    }

    const getExams = () => {
        const data = localStorage.getItem("savedExams");
        const allExams = JSON.parse(data);
        return allExams;
    }

    return (
        <LocalStorageContext.Provider value={{
            setExams, 
            getExams
        }}>
            {props.children}
        </LocalStorageContext.Provider>
    );
};

export default LocalStorageState;