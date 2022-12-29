import { NavLink } from 'react-router-dom';
import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {


    return (
        <li className='queston-list-item'>
            <NavLink to={`/questions/${question.id}`}>{question.title}</NavLink>
        </li>
    )
}

export default QuestionIndexItem;