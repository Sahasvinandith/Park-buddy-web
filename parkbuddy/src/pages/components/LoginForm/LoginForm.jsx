import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { auth } from '../../../API/firebase_auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Signup_contents from './Signup_contents';

// let UserName="";
const LoginForm = () => {
    const navigator = useNavigate();
    const [UserName,setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [action, setAction] = useState('');
    //const [errors, setErrors] = useState({}); // Define setErrors here

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        //validation success
        try {
            let tempuser = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created: ",tempuser.user.email);
            console.log("UserName: ",UserName);
            navigator("User_info/"+email+"/"+UserName);
            // redirect the user to a different page
        } catch (err) {
            console.log("Error creating user : ",err);

        }
    };

    const handleLogin = async (e) => {
       
        e.preventDefault();
        try {
            console.log("Login as user: ",email, password);
            let tempuser=await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Success as user: ",tempuser.user.email);
            navigator("ParkBuddy/"+tempuser.user.email);
            //redirect the user to a different page after successful login
        } catch (err) {
            console.log("Error login as user: ",err);

        }
    };

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <div className="bodyDiv">
            <div className={`wrapper ${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>Welcome back!</h1>
                        <div className="input-box">
                            <input type="text" placeholder='UserName' required onChange={(e) => setEmail(e.target.value)} />
                            <FaUser color='black' className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock color='black' className="icon" />
                        </div>
                        <button type="submit">Sign in</button>
                        <div className='register-link'>
                            <p>Don't have an account? <a href="#" onClick={registerLink}>Sign Up</a></p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleSignUp}>
                        <h1>Welcome!</h1>
                        <h2>Sign up to use Parkbuddy</h2>
                        <div className="input-box">
                            <input type="text" placeholder='UserName' value={UserName} required onChange={(e) => setUserName(e.target.value)}/>
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <FaLock className="icon" />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" required />I agree to the terms and conditions</label>
                        </div>
                        <button type="submit">Sign up</button>
                        <div className='register-link'>
                            <p>Already have an account? <a href="#" onClick={loginLink}>Sign In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
