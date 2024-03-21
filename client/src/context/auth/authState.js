import React, { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const authenticate = () => {}
    const login = () => {}
    const signup = () => {}
};