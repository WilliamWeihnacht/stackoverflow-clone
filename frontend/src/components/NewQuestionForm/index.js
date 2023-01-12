import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createQuestion } from '../../store/questionsReducer';
import "./NewQuestionForm.css";

const NewQuestionForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([]);
        const data = {
            title,
            body,
        }
        dispatch(createQuestion(data))
        .catch(async(res) => {
            let d;
            try {
                d = await res.clone().json();
            } catch {
                d = await res.text();
            }
            if (d?.errors) setErrors(d.errors);
            else if (d) setErrors([d]);
            else setErrors([res.statusText]);
        })
        // .then(setSubmitted(true))
        // if (errors[0]?.length === 0) setSubmitted(true);
    }

    if (!sessionUser || submitted) return <Redirect to={`/`}/>

    return (
        <div className='new-question-form-container'>
            <form onSubmit={handleSubmit} className='new-question-form'>
                <div id='new-question-form-instructions'>
                    <h4>Writing a good question</h4>
                    <ul>
                        <li>Summarize your problem in a one-line title.</li>
                        <li>Describe your problem in more detail.</li>
                        <li>Describe what you tried and what you expected to happen.</li>
                        <li>Review your question and post it to the site.</li>
                    </ul>
                </div>
                <ul className='error-list'>
                    {errors[0]?.map(error => <li key={error}>{error}</li>)}
                </ul>
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