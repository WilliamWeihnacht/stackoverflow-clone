import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createQuestion } from '../../store/questionsReducer';
import "./NewQuestionForm.css";

const NewQuestionForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const id = useSelector(state => state.session.user.id);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = {
            title,
            body,
        }
        dispatch(createQuestion(data));
        setSubmitted(true);
    }

    if (submitted) return <Redirect to={`/`}/>

    return (
        <div className='new-question-form-container'>
            <form onSubmit={handleSubmit} className='new-question-form'>
                <label>Title<br></br>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>Body<br></br>
                    <textarea value={body} onChange={e => setBody(e.target.value)} />
                </label>
                <button>Ask</button>
            </form>
        </div>
    )
}

export default NewQuestionForm;