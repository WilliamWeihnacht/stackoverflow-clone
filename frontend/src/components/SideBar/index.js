import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    return (
        <div id='sidebar'>
            <div id='sidebar-links'>
                <NavLink exact to={'/'} className='sidebar-link'>Home</NavLink>
                <NavLink to={'/questions'} className='sidebar-link'>Questions</NavLink>
                <NavLink to={'/'} className='sidebar-link'>Users</NavLink>
            </div>
        </div>
    )
}

export default SideBar;