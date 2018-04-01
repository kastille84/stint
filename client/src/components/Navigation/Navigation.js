import React from 'react';
import { NavLink } from 'react-router-dom';

const navigation = (props) => {  

    // not logged in - Navigation
    let navigation = (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <NavLink to="/" className="navbar-brand">Stint</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>    
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
            </ul>            
            </div>
      </nav>
    )
    // Logged in  & whichusermode is true
    if (props.isLoggedIn && props.whichUserMode) {
        navigation = (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <NavLink to="/" className="navbar-brand">Stint</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>    
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">                    
                    <li className="nav-item">
                        <NavLink to="/signin" className="nav-link">Signout</NavLink>
                    </li>
                </ul>            
                </div>
            </nav>
        )        
    }
    // Logged in Navigation
    if (props.isLoggedIn && !props.whichUserMode) {
        navigation = (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <NavLink to="/" className="navbar-brand">Stint</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>    
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/dashboard" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard/addChild" className="nav-link">Children</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard/" className="nav-link">Chores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard/" className="nav-link">ChoreList</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard/" className="nav-link">Signout</NavLink>
                        </li>
                    </ul>            
                </div>
            </nav>
        )
    }
    return (
        <div>
            {navigation}
        </div>
    )
}

export default navigation;

