import React, { useState } from "react";
import "../styles/LoginSignup.css";
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiGithub,
  FiLinkedin,
  FiUserPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();

  async function handleSubmitRegister(e) {
    e.preventDefault();

    if (inputs.password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(inputs.password)) {
      setError("Password should contain at least one uppercase letter.");
      return;
    }

    const response = await fetch(
      "https://ubade.pythonanywhere.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      }
    );
    if (response.status === 400) {
      const responseBody = await response.json();
      console.log(responseBody);

      if (
        responseBody.username[0] === "A user with that username already exists."
      ) {
        setError(
          "Username already exists. Please choose a different username."
        );
      } else {
        setError("An error occurred during registration.");
      }
      return;
    }

    const { token } = await response.json();

    // Store token in local storage
    localStorage.setItem("token", token);
    navigate("/notes");
  }
  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ubade.pythonanywhere.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputs.username,
            password: inputs.password,
          }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        navigate("/notes");
      } else {
        throw new Error("Login faild");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fullpage">
      <div id="container" className={isActive ? "active" : "close"}>
        <div className="login">
          <div className="content">
            <h1>Log In</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmitLogin}>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button type="submit">Login</button>
            </form>
            <span className="loginwith">Or Connect with</span>
            <a
              href="https://github.com/tevfik94"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className="s-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/tevfik-istanbullu/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="s-icon" />
            </a>
          </div>
        </div>
        <div className="page front">
          <div className="content">
            <FiUserPlus className="b-icon" />
            <h1>Hello, friend!</h1>
            <p>Enter your personal details and start saving your notes</p>
            <button onClick={() => handleRegisterClick()} id="register">
              Register <FiArrowRightCircle className="s-icon" />
            </button>
          </div>
        </div>
        <div className="page back">
          <div className="content">
            <FiUserPlus className="b-icon" />
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={() => handleLoginClick()} id="login">
              <FiArrowLeftCircle className="s-icon" />
              Log In
            </button>
          </div>
        </div>
        <div className="register">
          <div className="content">
            <h1>Sign Up</h1>
            <a
              href="https://github.com/tevfik94"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className="s-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/tevfik-istanbullu/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="s-icon" />
            </a>
            <span className="loginwith">Or</span>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmitRegister}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                autoComplete="new-username"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
