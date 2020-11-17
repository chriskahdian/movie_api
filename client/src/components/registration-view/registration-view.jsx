// import React, {useState} from "react";
// import axios from 'axios';

// export function RegistrationView(props) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [birthday, setBirthday] = useState("");
//     let user = {
//         Username,
//         Password,
//         Email,
//         Birthday
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!username) {
//           alert('username is required');
//         }
//         if (username) {
//           if (username.length < 4) {
//             alert('username has to be longer than 4 characters');
//           }
//         }
//         if (!password) {
//           alert('password is required');
//         }
//         axios
//           .post('https://myflix001.herokuapp.com/users', {
//             Username,
//             Password,
//             Email,
//             Birthday,
//           })
//           .then((res) => {
//             login(res.data);
//           })
//           .catch((e) => {
//             console.log(e, 'Error registering user');
//           });
//       };
    
//       const login = (data) => {
//         axios
//           .post('https://myflix001.herokuapp.com/login', {
//             username: data.username,
//             password: user.password,
//           })
//           .then((res) => {
//             const data = res.data;
//             props.onLoggedIn(data);
//             window.open('/client', '_self');
//           })
//           .catch((e) => {
//             console.log('No such user', e);
//           });
//       };
    
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     if (!username) {
//     //       alert('Username is required');
//     //     }
//     //     if (username) {
//     //       if (username.length < 4) {
//     //         alert('Username has to be longer than 4 characters');
//     //       }
//     //     }
//     //     if (!password) {
//     //       alert('Password is required');
//     //     }
//     //     axios
//     //         .post('https://myflix001.herokuapp.com/users', {
//     //             username,
//     //             password,
//     //             email,
//     //             birthday,
//     //         })
//     //         .then((res) => {
//     //             LoginView(res.data);
//     //         })
//     //         .catch((e) => {
//     //             console.log(e, 'Error registering user, please review requirements');
//     //         });
//     // };

//     return (
//         <form>
//         <label>
//             Username:
//             <input type="text" value={username} onChange = {e => setUsername(e.target.value)} />
//         </label>
//         <label>
//             Password:
//             <input type="password" value={password} onChange= {e => setPassword (e.target.value)} />
//         </label>
//         <label>
//             Birth Date:
//             <input type="string" value={birthday} onChange= {e => setBirthday (e.target.value)} />
//         </label>
//         <label>
//             Email:
//             <input type="email" value={email} onChange= {e => setEmail (e.target.value)} />
//         </label>
//         <button type ="button" onClick={handleSubmit}>Register</button>
//     </form>
//     );
// }









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

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob,
    };

    axios
      .post("https://myflix001.herokuapp.com/users", createdUser)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("User created successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e.response);
        alert("Error processing request");
      });
  };

  return (
    <Form style={{ width: "32rem", margin: "auto", textAlign: "center" }}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
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