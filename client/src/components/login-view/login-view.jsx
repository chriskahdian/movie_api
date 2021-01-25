import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://moviesmoviesmovies.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
            alert('No such user')
        });
    };

    return (
        
        <Form className="login-form">
            <Form.Group controlId="pageTop">
                <Form.Label className="page-top">
                    <h1>Login</h1>
                    Hello, please log in or register
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="submitButton">
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}