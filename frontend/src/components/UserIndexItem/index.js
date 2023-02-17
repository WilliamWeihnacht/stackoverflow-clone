import { Link } from 'react-router-dom';
import './UserIndexItem.css';

const UserIndexItem = ({user}) => {

    return (
        <li className='question-list-item'>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
        </li>
    )
}

export default UserIndexItem;