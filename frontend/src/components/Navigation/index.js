import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { fetchAllQuestions } from '../../store/questionsReducer';
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
      <button onClick={logout} id='log-out-button'>Logout</button>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login"><button id='log-in-button'>Log In</button></NavLink>
        <NavLink to="/signup"><button id='sign-up-button'>Sign Up</button></NavLink>
      </>
    );
  }

  return (
    <ul className='navbar'>
        <div id='navbar-content'>
          <li id='logo-li'><NavLink exact to={sessionUser ? "/questions?page=1" : "/splash"}><span className='logo-image'><p id='ltgt'>&lt;</p><p id='sl'>/</p><p id='ltgt'>&gt;</p>hack<strong>overload</strong></span></NavLink></li>
          <li id='search-li'>
            <SearchBar/>
          </li>
          <li id='session-li'>
            {sessionLinks}
          </li>
        </div>
    </ul>
  );
}

export default Navigation;