import React from "react";
import { Link } from 'react-router-dom'

function Header(props) {


    return(
        <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              <li>
              {props.auth
                ? <li>{`Welcome ${props.name.firstName}`}</li> //Auth true, Show name
                : <Link to="/signup">Sign up</Link> //Auth false, Sign up link
              }
              </li>
              <li>
              {props.auth
                ? <Link to="/signout">Sign Out</Link> //Auth true Sign out link next to name
                : <Link to="/signin">Sign In</Link> //Auth false Sign in link next to sign up link
              }
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
}

export default Header; 