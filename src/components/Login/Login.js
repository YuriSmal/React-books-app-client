import React, { useState } from 'react';
import {useMutation} from '@apollo/client';
import { LOGIN_MUTATION } from '../../typeDefs/typeDefs';

function Login(props) {

    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted(data) {
            if (data) {
                localStorage.setItem('token', data.login.accessToken);
                localStorage.setItem('refreshToken', data.login.refreshToken);
                props.updateToken(data.login.accessToken);
            }
        }
    })

    const [ userName, handleNameChange ] = useState('');
    const [ password, handlePasswordChange ] = useState('');

    const [ userNameErr,  setNameErr] = useState({});
    const [ passwordErr,  setPasswordErr] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        const isValid = validateLoginForm();
        if (isValid) {
            login({ variables: { name: userName, password: password} })
                .then((data) => {

                })
                .catch(err => {
                    if (err.message === "400: Bad Request") {
                        alert("Incorrect username or password")
                    }
                    localStorage.clear();
                });
        } else {
            alert("Please fill in the correct values")
        }
    }

    const validateLoginForm = () => {
        const userNameErr = {};
        const passwordErr = {};
        let isValid = true;

        if (userName.trim().length < 4) {
            userNameErr.userNameTooShort = 'Username is too short';
            isValid = false;
        }

        if (password.trim().length < 9) {
            passwordErr.passwordTooShort = 'Password must be at least 9 characters';
            isValid = false;
        }

        setNameErr(userNameErr);
        setPasswordErr(passwordErr);
        return isValid;
    }

    return (
        <div className='container mt-4 w-50'>
            <form onSubmit={handleLogin} method='/POST'>
                <div className="row mb-3">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input onBlur={validateLoginForm} value={userName} onChange={e => handleNameChange(e.target.value)} type="text" className="form-control" id="inputName" required/>
                    </div>
                    {Object.keys(userNameErr).map(key => {
                        return <div style={{color: "red"}} key={key} >{userNameErr[key]}</div>
                    })}
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input onBlur={validateLoginForm} value={password} onChange={e => handlePasswordChange(e.target.value)} type="password" className="form-control" id="inputPassword" required/>
                    </div>
                    {Object.keys(passwordErr).map(key => {
                        return <div style={{color: "red"}}  key={key}>{passwordErr[key]}</div>
                    })}
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default Login;