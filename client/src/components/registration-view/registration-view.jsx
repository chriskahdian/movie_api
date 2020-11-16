import React, {useState} from "react";
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    let user = {
        username,
        password,
        email,
        birthday
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
          alert('username is required');
        }
        if (username) {
          if (username.length < 4) {
            alert('username has to be longer than 4 characters');
          }
        }
        if (!password) {
          alert('password is required');
        }
        axios
          .post('https://myflix001.herokuapp.com/users', {
            username,
            password,
            email,
            birthday,
          })
          .then((res) => {
            login(res.data);
          })
          .catch((e) => {
            console.log(e, 'Error registering user');
          });
      };
    
      const login = (data) => {
        axios
          .post('https://myflix001.herokuapp.com/login', {
            username: data.username,
            password: user.password,
          })
          .then((res) => {
            const data = res.data;
            props.onLoggedIn(data);
            window.open('/client', '_self');
          })
          .catch((e) => {
            console.log('No such user', e);
          });
      };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!username) {
    //       alert('Username is required');
    //     }
    //     if (username) {
    //       if (username.length < 4) {
    //         alert('Username has to be longer than 4 characters');
    //       }
    //     }
    //     if (!password) {
    //       alert('Password is required');
    //     }
    //     axios
    //         .post('https://myflix001.herokuapp.com/users', {
    //             username,
    //             password,
    //             email,
    //             birthday,
    //         })
    //         .then((res) => {
    //             LoginView(res.data);
    //         })
    //         .catch((e) => {
    //             console.log(e, 'Error registering user, please review requirements');
    //         });
    // };

    return (
        <form>
        <label>
            Username:
            <input type="text" value={username} onChange = {e => setUsername(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange= {e => setPassword (e.target.value)} />
        </label>
        <label>
            Birth Date:
            <input type="string" value={birthday} onChange= {e => setBirthday (e.target.value)} />
        </label>
        <label>
            Email:
            <input type="email" value={email} onChange= {e => setEmail (e.target.value)} />
        </label>
        <button type ="button" onClick={handleSubmit}>Register</button>
    </form>
    );
}