import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";

export function UpdateView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    const url =
      "https://myflix001.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .put(
        url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        localStorage.setItem("user", data.Username);
        // props.setUsername(data.Username);
        alert("Your profile data was updated successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <h1>Update your account</h1>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birth Date:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            placeholder="Select Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Link to={`/users/`}>
          <Button
            variant="btn-lg btn-dark btn-block"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
