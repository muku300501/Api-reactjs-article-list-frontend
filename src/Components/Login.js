import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    let history = useHistory()

    useEffect(() => {
        if(token['mytoken']){
            history.push('/articles')
        }
    }, [token])

    const loginBtn = () => {
       APIService.LoginUser({username, password})
       .then(response => setToken('mytoken' ,response.token))
       .catch(error => console.log(error))
    }

    return (
        <div className="App">
            <br />
            <br />
            <h1>Please Login</h1>
            <br />
            <br />
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Please Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Please Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <button onClick={loginBtn} className="btn btn-primary">Login</button>
        </div>
    )
}

export default Login
