import { Link } from 'react-router-dom';
import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {

    return (
        <li className='queston-list-item'>
            <Link to={`/questions/${question.id}`}>{question.title}</Link>
            <div className='question-stats'>
                <span>{question.answerCount} Answers</span>
                <span>{question.voteCount} Votes</span>
            </div>
        </li>
    )
}

export default QuestionIndexItem;