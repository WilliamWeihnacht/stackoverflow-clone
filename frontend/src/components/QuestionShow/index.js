import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, deleteQuestion, editQuestion } from '../../store/questionsReducer';
import { createAnswer } from '../../store/answersReducer';
import "./QuestionShow.css";
import AnswerIndexItem from '../AnswerIndexItem';
import VoteButtons from '../VoteButtons';

const QuestionShow = () => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(state => state.questions[questionId]);
    const [title, setTitle] = useState(question?.title || "");
    const [questionBody, setQuestionBody] = useState(question?.body || "");
    const [answerBody, setAnswerBody] = useState("");
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [errors, setErrors] = useState([]);
    const answers = useSelector(state => Object.values(state.answers));
    const userId = useSelector(state => state.session?.user?.id);
    
    answers.sort((a,b)=>{
        if (a.score < b.score) return 1
        if (a.score > b.score) return -1
        return 0
    });

    useEffect(() => {
        dispatch(fetchQuestion(questionId));
    }, [dispatch, questionId, editing]);

    if (deleted) return <Redirect to="/"/>;
    if (!question) {
        return (
            <div className='question-header'>
                <h1>Question not found</h1>
            </div>
        )
    }

    const convertDateTime = (date) => {
        const year = date.slice(0,4);
        const month = date.slice(5,7);
        const day = date.slice(8,10);
        return month + "-" + day + "-" + year;
        // let x = new Date(date);
    }

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        setErrors([])
        const data = {
            question_id: question.id,
            body: answerBody
        }
        dispatch(createAnswer(data))
        .catch(async (res) => {
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
        .then(setAnswerBody(""))
        console.log(errors)
        // dispatch(fetchQuestion(questionId));
    }

    const handleSubmitEdit = (e) => {
        //if title is blank pass in original title
        e.preventDefault();

        let data;
        if (title === "" && questionBody === "") {
            console.log(1)
            setEditing(false);
            return;
        } else if (title === "") {
            console.log(2)
            data = {
                question_id: questionId,
                body: questionBody
            }
        } else if (questionBody === "") {
            console.log(3)
            data = {
                question_id: questionId,
                title
            }
        } else {
            console.log(4)
            data = {
                question_id: questionId,
                title,
                body: questionBody
            }
        }

        dispatch(editQuestion(data))
        .catch(async (res) => {
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
        setEditing(false);
        dispatch(fetchQuestion(questionId));
    } 

    const handleDelete = (e) => {
        dispatch(deleteQuestion(question.id));
        setDeleted(true);
    }

    let updateLinks;
    if (userId === question.userId) {
        updateLinks = (<span><a onClick={()=>setEditing(!editing)}>Edit</a><a onClick={handleDelete}>Delete</a></span>)
    } else {
        updateLinks = (<></>)
    }

    let questionContent;
    if (editing) {
       questionContent = (
            <>
            <form onSubmit={handleSubmitEdit}>
                <div className='question-header'>
                    <label><h1>Title</h1>
                        <input type="text" defaultValue={question.title} onChange={e => setTitle(e.target.value)}/>
                    </label>
                </div>
                <div className='question-body'>
                    <div className='question-voting-container'>
                        <VoteButtons post={question}/>
                    </div>
                    <label>Body
                        <textarea defaultValue={question.body} onChange={e => setQuestionBody(e.target.value)}></textarea>
                    </label>
                </div>
                <button>Update</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </form>
            </>
       )
    } else {
        questionContent = (
            <>
                <div className='question-header'>
                    <h1>{question.title}</h1>
                    <span><strong>Asked</strong> {convertDateTime(question.createdAt)}, <strong>Modified</strong> {convertDateTime(question.updatedAt)}</span>
                    {updateLinks}
                </div>
                <div className='question-body'>
                    <div className='question-voting-container'>
                        <VoteButtons post={question}/>
                    </div>
                    <p>{question.body}</p>
                </div>
            </>
        )
    }

    return (
        <div className='question-page-container'>
            <div className='question-content-container'>
                {questionContent}
            </div>
            <div id='answer-header-bar'>
                <h2>{answers.length} {answers.length === 1 ? "Answer" : "Answers"}</h2>
            </div>
            <div className='question-answers-container'>
                <ul>
                    {answers?.map((answer, i) => <AnswerIndexItem answer={answer} key={i}/>)}
                </ul>
            </div>
            <div className='new-answer-form-container'>
                <h1>Your Answer</h1>
                <form onSubmit={handleSubmitAnswer}>
                    {/* <ul className='error-list'>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul> */}
                    <textarea onChange={e => setAnswerBody(e.target.value)} />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default QuestionShow;