import { Link } from 'react-router-dom';
import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {

    const displayDate = (q) => {
        let updated = new Date(q.updatedAt);
        let created = new Date(q.createdAt);
        if (created < updated) return "Modified: " + updated.toDateString();
        else return "Created: " + created.toDateString();
    }

    return (
        <li className='queston-list-item'>
            <Link to={`/questions/${question.id}`}>{question.title}</Link>
            <div className='question-stats'>
                <span>{question.answerCount} {question.answerCount === 1 ? "Answer" : "Answers"}</span>
                <span>{question.voteCount} {question.voteCount === 1 ? "Vote" : "Votes"}</span>
                <span>|</span>
                <span>{displayDate(question)}</span>
            </div>
            <a id='user-link'>{question.user}</a>
        </li>
    )
}

export default QuestionIndexItem;