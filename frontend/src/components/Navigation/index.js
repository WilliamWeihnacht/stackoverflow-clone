import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../img/navbar-logo.png';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <button><NavLink to="/login">Log In</NavLink></button>
        <button><NavLink to="/signup">Sign Up</NavLink></button>
      </>
    );
  }

  return (
    <ul className='navbar'>
      <li>
        <NavLink exact to="/"><span className='logo-image'>Stack Overflow</span></NavLink>
        <input></input>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;