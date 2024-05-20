import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function SignFile() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const CollectData = async () => {
        console.warn(name, email, password);
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            const result = await response.json();
            console.warn(result);
            if (result) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="register">
            <p>Register</p>
            <input className="inputBox" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="inputBox" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputBox" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={CollectData} className="appButton" type="button">Sign In</button>
        </div>
    );
}

export default SignFile;