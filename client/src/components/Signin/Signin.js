import React, {useContext} from "react";
import authContext from "../../context/auth/authContext";
import {useNavigate} from "react-router-dom";

function SignInForm(props) {
    const {screenSize, type, handleOnClick} = props;
    const {login} = useContext(authContext);
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        email: "",
        password: ""
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

        const {email, password} = state;

        if (emailRegex.test(email)) {
            if (passwordRegex.test(password)) {
                const flag = await login(email, password);
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
    };

    return (
        <>
            <div
                className={`form-container ${screenSize === "mobile" ? "w-full" : "sign-in-container"} ${type === "signUp" ? "hidden" : ""}`}>
                <form onSubmit={handleOnSubmit}>
                    <h1>Sign in</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <button>Sign In</button>
                    <div
                        className={`text-center mt-5 w-full ${screenSize === "mobile" ? "" : "hidden"} ${type === "signUp" ? "hidden" : ""}`}>
                        <span>Don't have an Account ?</span>
                        <span
                            className="ms-5 font-semibold text-blue-600 underline"
                            id="signUp"
                            onClick={() => handleOnClick("signUp")}
                        >
                            Sign Up
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignInForm;
