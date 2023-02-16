import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    return (
        <div id='sidebar'>
            <div id='sidebar-links'>
                <NavLink exact to={'/'} className='sidebar-link' activeClassName='sidebar-link-active'>Home</NavLink>
                <NavLink to={'/questions'} className='sidebar-link' activeClassName='sidebar-link-active'>Questions</NavLink>
                <NavLink to={'/users'} className='sidebar-link' activeClassName='sidebar-link-active'>Users</NavLink>
            </div>
        </div>
    )
}

export default SideBar;