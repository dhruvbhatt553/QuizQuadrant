import React, {useContext, useState} from "react";
import AuthContext from "./authContext";
import axios from "axios";
import localStorageContext from "../local-storage/localStorageContext";


const AuthState = (props) => {
    const {setToken, getToken, removeToken} = useContext(localStorageContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});


    const authenticate = async () => {
        console.log("auth ...");
        if (getToken()) {
            console.log("token present ...");
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/authenticate`, {
                        headers: {
                            'Authorization': `Bearer ${getToken()}`
                        }
                    }
                );
                if (response.status === 200) {
                    setToken(response.data.token);
                    const newUser = {
                        userId: response.data.userId,
                        type: response.data.type,
                        name: response.data.name,
                        email: response.data.email
                    }
                    setUser(newUser);
                    setIsAuthenticated((isAuthenticated) => {
                        return true;
                    });
                    console.log(response.data);
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                return false;
            }
        }
    }
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
                email: email,
                password: password
            });
            if (response.status === 200) {
                setToken(response.data.token);
                const newUser = {
                    userId: response.data.userId,
                    type: response.data.type,
                    name: response.data.name,
                    email: response.data.email
                }
                setUser(newUser);
                setIsAuthenticated((isAuthenticated) => {
                    return true;
                });
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
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
                type: type,
                name: name,
                email: email,
                password: password
            });
            if (response.status === 200) {
                setToken(response.data.token);
                const newUser = {
                    userId: response.data.userId,
                    type: response.data.type,
                    name: response.data.name,
                    email: response.data.email
                }
                setUser(newUser);
                setIsAuthenticated((isAuthenticated) => {
                    return true;
                });
                console.log(response.data);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    const logout = () => {
        removeToken();
        localStorage.clear();
        setIsAuthenticated((isAuthenticated) => {
            return false;
        });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            register,
            login,
            authenticate,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;