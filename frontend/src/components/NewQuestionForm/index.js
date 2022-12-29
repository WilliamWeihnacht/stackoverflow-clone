import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../store/questionsReducer';
import "./NewQuestionForm.css";

const NewQuestionForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const id = useSelector(state => state.session.user.id);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = {
            user_id: id,
            title,
            body,
        }
        dispatch(createQuestion(data));
    }

    return (
        <>
            <h1>Ask a new question</h1>
            <form onSubmit={handleSubmit}>
                <label>Title
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>Body
                    <textarea value={body} onChange={e => setBody(e.target.value)} />
                </label>
                <button>Create</button>
            </form>
        </>
    )
}

export default NewQuestionForm;