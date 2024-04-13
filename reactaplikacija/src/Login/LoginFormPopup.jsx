import React, { useState } from 'react';
import './LoginFormPopup.css';  

const LoginFormPopup = () => {
    const [activeTab, setActiveTab] = useState('login');

    const switchTab = (tab) => {
        setActiveTab(tab);
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
                                        <form action="">
                                            <input type="email" placeholder="Email" required/>
                                            <input type="password" placeholder="Password" required/>
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
                                        <form action="">
                                            <input type="email" placeholder="Email" required/>
                                            <input type="password" placeholder="Password" required/>
                                            <input type="password" placeholder="Confirm password" required/>
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
