import React, { useState } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";

const ProfileState = (props) => {
    const fetchProfile = async (userID) => {
        const response = await axios.get(`http://localhost:8080/api/user/profile?userId=${userID}`)
        console.log("response : ", response.data);
        return response.data;
    };

    const generateResult = async (examID) => {
        const response = await axios.get(`http://localhost:8080/api/exam/calculate-result?examId=${examID}`)
        console.log("response : ", response.data);
        return response.data;
    };

    return (
        <ProfileContext.Provider value={{ fetchProfile, generateResult }}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileState;