import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./registration-view.scss";
import { Link } from "react-router-dom";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (/[^0-9a-zA-Z]/.test(username)) {
      usernameErr.username = "Username cannot contain symbols";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  };


  const handleSubmit = (e) => {

    const isValid = formValidation();
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob,
    };
    if (isValid) {
      axios
        .post("https://moviesmoviesmovies.herokuapp.com/users", createdUser)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          alert("User created successfully");
          window.open("/client", "_self");
        })
        .catch((e) => {
          console.log(e.response);
          console.log(e.response.data.errors[0].msg);
        });
    }
  };

  
  return (
    <Form className="registration-form">
      <Form.Group controlId="pageTop">
        <Form.Label className="page-top">
          <h1>Register</h1>
          Hello, please register
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="Enter username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {Object.keys(usernameErr).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {usernameErr[key]}
            </div>
          );
        })}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {Object.keys(passwordErr).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {passwordErr[key]}
            </div>
          );
        })}
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {Object.keys(emailErr).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {emailErr[key]}
            </div>
          );
        })}
      </Form.Group>
      <Form.Group controlId="formBasicDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={dob}
          placeholder="12/31/1986"
          onChange={(e) => setDob(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Link to={`/`}>
        <Button variant="link" type="submit">
          Cancel
        </Button>
      </Link>
    </Form>
  );
}