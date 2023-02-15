import { Link } from 'react-router-dom';
import "./UserAnswerIndexItem.css";

const UserAnswerIndexItem = ({ answer }) => {

    const displayDate = (a) => {
        let updated = new Date(a.updatedAt);
        let created = new Date(a.createdAt);
        if (created < updated) return "Modified: " + updated.toDateString();
        else return "Created: " + created.toDateString();
    }

    return (
        <li className='question-list-item'>
            <Link to={`/questions/${answer.questionId}`} >{answer.body}</Link>
            <div className='question-stats'>
                <span>{answer.voteCount} {answer.voteCount === 1 ? "Vote" : "Votes"}</span>
                <span>|</span>
                <span>{displayDate(answer)}</span>
            </div>
        </li>
    )
}

export default UserAnswerIndexItem;