import { Link } from 'react-router-dom';
import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {

    return (
        <li className='queston-list-item'>
            <Link to={`/questions/${question.id}`}>{question.title}</Link>
            <div className='question-stats'>
                <span>{question.answerCount} {question.answerCount === 1 ? "Answer" : "Answers"}</span>
                <span>{question.voteCount} {question.voteCount === 1 ? "Vote" : "Votes"}</span>
            </div>
            <Link id='user-link'>{question.user}</Link>
        </li>
    )
}

export default QuestionIndexItem;