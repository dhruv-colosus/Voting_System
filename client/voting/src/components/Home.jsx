import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(0);
  const history = useHistory();

  const LoginUser = () => {
    Axios.post("http://localhost:1111/login", {
      username: username,

      password: password,
    }).then((response) => {
      if (response.data.VoteDone === 9) {
        console.log(response.data.message);
        setMsg(1);
      } else {
        localStorage.setItem("username_sqll", username);
      }
    });
  };
  useEffect(() => {
    if (localStorage.getItem("username_sqll")) {
      history.push("/voters");
    }
  }, []);

  return (
    <div className="home_align">
      <div className="grid">
        <form className="form login">
          <h1>Vote For Your Party Now ! Login Here .</h1>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <AiOutlineUser />
              </svg>
              <span className="hidden">Username</span>
            </label>
            <input
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
            <input type="submit" value="Sign In" onClick={LoginUser} />
          </div>
        </form>

        <p className="text--center">
          Not a member? <Link to="/register">Sign Up Now</Link>
          <svg className="icon">
            <AiOutlineUser />
          </svg>
        </p>
        {msg ? (
          <>
            <h1 className="warning">Wrong Username or Password</h1>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
