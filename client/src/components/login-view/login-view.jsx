//using useState
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


//_
//3.5 VERSION

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflix001.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
        <Form>
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
            <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Form>
    );
}







//_
//3.4 VERSION

// export function LoginView(props) {
//     const [ username, setUsername ] = useState('');
//     const [ password, setPassword ] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(username, password);
//         //send request to server for auth, then call props.onLoggedIn(username) below
//         props.onLoggedIn(username);
//     };

//     return (
//         <form>
//             <label>
//                 Username:
//                 <input type="text" value={username} onChange = {e => setUsername(e.target.value)} />
//             </label>
//             <label>
//                 Password:
//                 <input type="password" value={password} onChange= {e => setPassword (e.target.value)} />
//             </label>
//             <button type="button" onClick={handleSubmit}>Submit</button>
//         </form>
//     );
// }