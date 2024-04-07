import React, {useContext, useState} from "react";
import authContext from "../../context/auth/authContext";
import {useNavigate} from "react-router-dom";

function SignUpForm(props) {
    const {screenSize, type, handleOnClick} = props;
    const navigate = useNavigate();
    const {register} = useContext(authContext);
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: "",
        type: "T"
    });


    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
        const {name, email, password, type} = state;
        if (name.length >= 3) {
            if (emailRegex.test(email)) {
                if (passwordRegex.test(password)) {
                    const flag = await register(name, type, password, email);
                    if (!flag) {
                        alert("Some problem occured !!!");
                    } else {
                        navigate("/");
                    }
                } else {
                    alert("Set password as instructed");
                }
            } else {
                alert("Enter Valid Email ID");
            }
        } else {
            alert("Minimum Length of name should be 3");
        }
    };

    return (
        <>
            <div
                className={`form-container ${screenSize === "mobile" ? "" : "sign-up-container"} ${type === "signIn" ? "hidden" : ""}`}>
                <form onSubmit={handleOnSubmit}>
                    <h1 className={`${screenSize === "mobile" ? "hidden" : ""}`}>Create Account</h1>
                    <div className="flex justify-between w-full px-12 my-2">
                        <div className="flex">
                            <input
                                type="radio"
                                name="type"
                                value="T"
                                id={"Teacher"}
                                onChange={handleChange}
                                checked={state.type === "T"}
                            />
                            <label htmlFor="Teacher" className="ms-1">Teacher</label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                name="type"
                                value="S"
                                id={"Student"}
                                onChange={handleChange}
                                checked={state.type === "S"}

                            />
                            <label htmlFor="Student" className="ms-1">Student</label>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Name"
                        maxLength={20}
                    />
                    <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Email"
                        maxLength={50}
                    />
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder={"Password"}
                    />
                    <p className="text-sm">NOTE: Password must contain atleast 1 letter, 1 number, 1 special character
                        and
                        minimum length of 8 characters.</p>
                    <button>Sign Up</button>
                    <div
                        className={`text-center mt-5 w-full ${screenSize === "mobile" ? "" : "hidden"} ${type === "signIn" ? "hidden" : ""}`}
                    >
                        <span>Already have an Account ?</span>
                        <span
                            className="ms-5 font-semibold text-blue-600 underline"
                            id="signUp"
                            onClick={() => handleOnClick("signIn")}
                        >
                            Sign In
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUpForm;
