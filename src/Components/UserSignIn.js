import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = (props) => {
  const [userLoginInfo, setUserInfo] = useState({});
  const [errorFromApp, setErrorMessage] = useState()

  const nav = useNavigate();
  
  const clearData = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.onLogin(userLoginInfo);
    setErrorMessage(props.error)
  };

  useEffect(() => {
    ;
    if (props.auth) {
      nav("/");
    }
  });

  return (
    
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          
          {/* Validation from api */}
          {errorFromApp ? 
                <div className="validation--errors">
                
                    <h3>Validation Errors</h3>
                    <ul>
                            
                        <li>{errorFromApp}</li>
                            
                    </ul>
                </div>
                : ''
                }
          

          <form onSubmit={handleSubmit}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={userLoginInfo.emailAddress}
              onChange={(e) =>
                setUserInfo({ ...userLoginInfo, emailAddress: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userLoginInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userLoginInfo, password: e.target.value })
              }
            />
            <button className="button" type="submit">
              Sign In
            </button>
            <Link to="/">
              <button onClick={clearData} className="button button-secondary">Cancel</button>
            </Link>
          </form>
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    
  );
};

export default UserSignIn;