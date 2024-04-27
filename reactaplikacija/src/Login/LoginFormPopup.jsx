import React, { useState } from 'react';
import axios from 'axios';
import './LoginFormPopup.css';  
import { useNavigate } from 'react-router-dom';

const LoginFormPopup = ({setToken}) => {
    let navigate=useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [firstName, setFirstName] = useState('Janko');
    const [lastName, setLastName] = useState('Jankovic');
    const [email, setEmail] = useState('nm20190015@student.fon.bg.ac.rs');
    const [password, setPassword] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('password');
    const [departmentId, setDepartmentId] = useState('1');

    const switchTab = (tab) => {
        setActiveTab(tab);
    }; 

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });
            console.log('Login response:', response.data);
            setToken(response.data.token)
            sessionStorage.setItem("token",response.data.token)
            if(response.data.user.admin==0){
                navigate('/dogadjaji')
            }else{
                navigate('/admin')
            }
          
        } catch (error) {
            console.error('Error logging in:', error);
            alert("GRESKA PRILIKOM REGISTRACIJE");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                firstName,
                lastName,
                email,
                password,
                confirm_password: confirmPassword,
                department_id: departmentId
            });
            console.log('Register response:', response.data);
            console.log('Login response:', response.data);
            setToken(response.data.token)
            sessionStorage.setItem("token",response.data.token)
            navigate('/dogadjaji')
        } catch (error) {
            console.error('Error registering:', error);
           alert("GRESKA PRILIKOM REGISTRACIJE");
        }
    };

    return (
        <div> 
            <section>
                <div className="rt-container">
                    <div className="col-rt-12" style={{margin:"25%"}}>
                        <div className="Scriptcontent">
                         
                                <div className="tabs">
                                    <input className="radio" id="tab-1" name="tabs-name" type="radio" checked={activeTab === 'login'} onChange={() => switchTab('login')}/>
                                    <label htmlFor="tab-1" className="table"><span>Login</span></label>
                                    <div className="tabs-content" style={{ display: activeTab === 'login' ? 'block' : 'none' }}>
                                        <form onSubmit={handleLoginSubmit}>
                                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            <input type="submit" value="Log In"/>
                                        </form>
                                        <form className="forgot-password" action="">
                                            <input id="forgot-password-toggle" type="checkbox"/>
                                            <label htmlFor="forgot-password-toggle">forgot password?</label>
                                            <div className="forgot-password-content">
                                                <input type="email" placeholder="enter your email" required/>
                                                <input type="submit" value="go"/>
                                            </div>
                                        </form>
                                    </div>

                                    <input className="radio" id="tab-2" name="tabs-name" type="radio" checked={activeTab === 'signup'} onChange={() => switchTab('signup')}/>
                                    <label htmlFor="tab-2" className="table"><span>Sign up</span></label>
                                    <div className="tabs-content" style={{ display: activeTab === 'signup' ? 'block' : 'none' }}>
                                        <form onSubmit={handleRegisterSubmit}>
                                            <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                            <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            <input type="password" placeholder="Confirm password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                            <input type="text" placeholder="Department ID" required value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}/>
                                            <input type="submit" value="Sign Up"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
              
            </section>
        </div>
    );
};

export default LoginFormPopup;
