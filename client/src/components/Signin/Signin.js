import React, {useContext} from "react";
import authContext from "../../context/auth/authContext";
import {useNavigate} from "react-router-dom";

function SignInForm() {
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

    const { email, password } = state;

    if (emailRegex.test(email)) {
      if (passwordRegex.test(password)) {
        const flag = await login(email,password);
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
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>

        <span>or use your account</span>
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
        <p className="text-sm">Password (Min length 8 and atleast 1 letter,1 number,1 special character</p>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
