import { useEffect, useState } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, getQuestion, deleteQuestion, editQuestion } from '../../store/questionsReducer';
import { createAnswer } from '../../store/answersReducer';
import "./QuestionShow.css";

const QuestionShow = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [answerBody, setAnswerBody] = useState("");
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const { questionId } = useParams();
    const question = useSelector(state => Object.values(state?.questions).find(q => q.id == questionId));
    const sessionUser = useSelector(state => state.session.user);
    const userId = useSelector(state => state.session?.user?.id);

    useEffect(() => {
        dispatch(fetchQuestion(questionId));
    }, [dispatch, questionId, editing]);

    if (!sessionUser) return <Redirect to={"/splash"}/>

    const convertDateTime = (date) => {
        const year = date.slice(0,4);
        const month = date.slice(5,7);
        const day = date.slice(8,10);
        return day + "-" + month + "-" + year;
    }

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        const data = {
            body: answerBody
        }
        dispatch(createAnswer(data));
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const data = {
            question_id: question.id,
            title,
            body: questionBody
        }
        dispatch(editQuestion(data))
        setEditing(false);
        dispatch(fetchQuestion(questionId));
    } 

    const handleDelete = (e) => {
        dispatch(deleteQuestion(question.id));
        setDeleted(true);
    }

    if (deleted) {
        return <Redirect to="/"/>;
    }

    if (!question) {
        return (
            <div className='question-header'>
                <h1>Question not found</h1>
            </div>
        )
    }

    let updateLinks;
    if (userId === question.user_id) {
        updateLinks = (<span><button onClick={()=>setEditing(!editing)}>Edit</button><button onClick={handleDelete}>Delete</button></span>)
    } else {
        updateLinks = (<></>)
    }

    let questionContent;
    if (editing) {
       questionContent = (
            <>
            <form onSubmit={handleSubmitEdit}>
                <div className='question-header'>
                    <label>Title
                        <input type="text" defaultValue={question.title} onChange={e => setTitle(e.target.value)}/>
                    </label>
                </div>
                <div className='question-body'>
                    <label>Body
                        <textarea defaultValue={question.body} onChange={e => setQuestionBody(e.target.value)}></textarea>
                    </label>
                </div>
                <button>Update</button>
            </form>
            </>
       )
    } else {
        questionContent = (
            <>
                <div className='question-header'>
                    <h1>{question.title}</h1>
                    <span>Asked: {convertDateTime(question.created_at)}, Modified: {convertDateTime(question.updated_at)}</span>
                    {updateLinks}
                </div>
                <div className='question-body'>
                    <p>{question.body}</p>
                </div>
            </>
        )
    }

    return (
        <>
            {questionContent}
            <div className='question-answers-container'>

            </div>
            <div className='new-answer-form-container'>
                <h1>Your Answer</h1>
                <form onSubmit={handleSubmitAnswer}>
                    <textarea onChange={e => setAnswerBody(e.target.value)} />
                    <button>Submit</button>
                </form>
            </div>
        </>
    )

}

export default QuestionShow;