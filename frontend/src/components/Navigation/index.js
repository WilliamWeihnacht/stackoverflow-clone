import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import SearchBar from '../SearchBar';

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
        <NavLink to="/login"><button>Log In</button></NavLink>
        <NavLink to="/signup"><button>Sign Up</button></NavLink>
      </>
    );
  }

  return (
    <ul className='navbar'>
      <li id='logo-li'>
        <NavLink exact to="/"><span className='logo-image'>Stack Overflow</span></NavLink>
      </li>
      <li id='search-li'>
        <SearchBar/>
        {/* <input placeholder='Search...'></input> */}
      </li>
      <li id='session-li'>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;