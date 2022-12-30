import { Link } from 'react-router-dom';
import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {


    return (
        <li className='queston-list-item'>
            <Link to={`/questions/${question.id-1}`}>{question.title}</Link>
            <div className='question-stats'>
                <span>0 Answers</span>
                <span>0 Votes</span>
            </div>
        </li>
    )
}

export default QuestionIndexItem;