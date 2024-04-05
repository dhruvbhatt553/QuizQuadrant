import React, {useContext, useState} from "react";
import AuthContext from "./authContext";
import axios from "axios";
import localStorageContext from "../local-storage/localStorageContext";



const AuthState = (props) => {
    const {setToken, getToken} = useContext(localStorageContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const authenticate = () => {}
    const login = async (email, password) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, {
                email: email,
                password: password
            });
            if(response.status === 200) {
                setToken(response.data.token);
                const newUser = {
                    userId: response.data.userId,
                    name: response.data.name,
                    email: response.data.email
                }
                setUser(newUser);
                console.log(response.data);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    const register = async (name, type, password, email) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/register`, {
                type: type,
                name: name,
                email: email,
                password: password
            });
            if(response.status === 200) {
                setToken(response.data.token);
                const newUser = {
                    userId: response.data.userId,
                    name: response.data.name,
                    email: response.data.email
                }
                setUser(newUser);
                console.log(response.data);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{register, login, authenticate}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;