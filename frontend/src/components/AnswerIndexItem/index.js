import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editAnswer, deleteAnswer } from "../../store/answersReducer";
import { fetchQuestion } from '../../store/questionsReducer';
import VoteButtons from '../VoteButtons';
import './AnswerIndexItem.css';


const AnswerIndexItem = ({ answer }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);
    const [answerBody, setAnswerBody] = useState(answer.body);

    const handleEdit = (e) => {
        setEditing(!editing);
    }

    const submitEdit = async (e) => {
        e.preventDefault();
        const data = {id: answer.id, body: answerBody}
        dispatch(editAnswer(data))
        .then(setEditing(false))
        .then(dispatch(fetchQuestion(answer.questionId)))
    }

    const handleDelete = async (e) => {
        dispatch(deleteAnswer(answer.id));
    }

    let bodyContent;
    if (!editing) {
        bodyContent = <p>{answer.body}</p>
    } else {
        bodyContent = 
        <form onSubmit={submitEdit}>
            <textarea value={answerBody} onChange={e => setAnswerBody(e.target.value)}></textarea>
            <button>Submit</button>
        </form>
    }

    let userContent = <a>{answer.user}</a>
    if (sessionUser?.id === answer.userId) {
        userContent = <>
            <a onClick={handleDelete} className='answer-links'>Delete </a>
            <a onClick={handleEdit} className='answer-links'>Edit </a>
        </>
    }

    return (
        <li className="answer-index-item">
            <VoteButtons post={answer}/>
            <div className="answer-content">
                {bodyContent}
                <span>{userContent}</span>
            </div>
        </li>
    )
}

export default AnswerIndexItem;