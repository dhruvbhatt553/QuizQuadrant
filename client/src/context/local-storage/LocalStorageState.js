import React, { useState } from 'react';
import LocalStorageContext from './localStorageContext';
import Cookies from 'js-cookie';
const LocalStorageState = (props) => {

    const setExams = (exams) => {
        localStorage.setItem("savedExams", JSON.stringify(exams));
    }

    const getExams = () => {
        const data = localStorage.getItem("savedExams");
        const allExams = JSON.parse(data);
        return allExams;
    }

    const setToken = (token) => {
        Cookies.set("authToken", token, { expires: 1 });
    }

    const getToken = () => {
        const token = Cookies.get("authToken");
        return token;
    }

    const removeToken = () => {
        Cookies.remove("authToken");
    }

    return (
        <LocalStorageContext.Provider value={{
            setExams, 
            getExams,
            setToken,
            getToken,
            removeToken
        }}>
            {props.children}
        </LocalStorageContext.Provider>
    );
};

export default LocalStorageState;