import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../store/answersReducer";
import VoteButtons from '../VoteButtons';
import './AnswerIndexItem.css';


const AnswerIndexItem = ({ answer }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleDelete = async (e) => {
        dispatch(deleteAnswer(answer.id))
    }

    let userContent = <a>{answer.user}</a>
    if (sessionUser.id === answer.userId) {
        userContent = <a onClick={handleDelete}>Delete this comment</a>
    }

    return (
        <li className="answer-index-item">
            <VoteButtons post={answer}/>
            <div className="answer-content">
                <p>{answer.body}</p>
                <span>{userContent}</span>
            </div>
        </li>
    )
}

export default AnswerIndexItem;