import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <button onClick={logout}>Logout</button>
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
      <li id='logo-li'>
        <NavLink exact to="/"><span className='logo-image'>Stack Overflow</span></NavLink>
      </li>
      <li id='search-li'>
        <input placeholder='Search...'></input>
      </li>
      <li id='session-li'>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;