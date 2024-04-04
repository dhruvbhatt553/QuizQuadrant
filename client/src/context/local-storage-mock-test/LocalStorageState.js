import React, { useState } from 'react';
import LocalStorageContext from './localStorageContext';

const LocalStorageState = (props) => {

    const setResponses = (responses) => {
        localStorage.setItem("savedResponses", JSON.stringify(responses));
    }

    const getResponses = () => {
        const data = localStorage.getItem("responses");
        const allResponses = JSON.parse(data);
        return allResponses;
    }

    return (
        <LocalStorageContext.Provider value={{
            setResponses, 
            getResponses
        }}>
            {props.children}
        </LocalStorageContext.Provider>
    );
};

export default LocalStorageState;