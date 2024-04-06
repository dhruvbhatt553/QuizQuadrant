import React, {useContext, useState} from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import localStorageContext from "../local-storage/localStorageContext";

const ProfileState = (props) => {

    const {getToken} = useContext(localStorageContext);

    const fetchProfile = async (userID) => {
        console.log(`Bearer ${getToken()}`);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile?userId=${userID}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        );
        console.log("response : ", response.data);
        return response.data;
    };

    const generateResult = async (examID) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/exam/calculate-result?examId=${examID}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        );
        console.log("response : ", response.data);
        return response.data;
    };

    return (
        <ProfileContext.Provider value={{fetchProfile, generateResult}}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileState;