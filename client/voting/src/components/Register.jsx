import React, { useState } from "react";
import "../styles/home.css";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [reg, setReg] = useState(0);
  const history = useHistory();

  const addUser = async (e) => {
    await Axios.post("http://localhost:1111/createuser", {
      username: username,

      password: password,
    }).then(() => {
      console.log("success");
      setReg(1);
    });
  };

  return (
    <div className="home_align">
      <div className="grid">
        <form className="form login">
          <h1>Register to Vote</h1>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <AiOutlineUser />
              </svg>
              <span className="hidden">Username</span>
            </label>
            <input
              autoComplete="username"
              id="login__username"
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__password">
              <svg className="icon">
                <RiLockPasswordFill />
              </svg>
              <span className="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Register" onClick={addUser} />
          </div>
        </form>

        <p className="text--center">
          Already a member? <Link to="/">Login</Link>
          <svg className="icon">
            <AiOutlineUser />
          </svg>
        </p>
        {reg ? (
          <>
            <h3>Registered Successfully</h3>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Register;
