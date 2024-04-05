import React, {useContext, useState} from "react";
import authContext from "../../context/auth/authContext";
import {useNavigate} from "react-router-dom";

function SignUpForm() {
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
        if(name.length >= 3) {
            if (emailRegex.test(email)) {
                if (passwordRegex.test(password)) {
                    const flag = await register(name, type, password, email);
                    if(!flag) {
                        alert("Some problem occured !!!");
                    } else  {
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
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Create Account</h1>

                <span>or use your email for registration</span>
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
                    placeholder={"password"}
                />
                <p className="text-sm">Password (Min length 8 and atleast 1 letter,1 number,1 special character</p>
                <div className="flex justify-between w-full px-12">
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

                <button>Sign Up</button>

            </form>
        </div>
    );
}

export default SignUpForm;
