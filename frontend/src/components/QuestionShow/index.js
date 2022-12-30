import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, getQuestion } from '../../store/questionsReducer';
import "./QuestionShow.css";



const QuestionShow = () => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(getQuestion(questionId));

    useEffect(() => {
        dispatch(fetchQuestion(questionId));
    }, [dispatch, questionId]);

    const convertDateTime = (date) => {
        const year = date.slice(0,4);
        const month = date.slice(5,7);
        const day = date.slice(8,10);
        return month + "-" + day + "-" + year;
    }

    return (
        <>
            <div className='question-header'>
                <h1>{question.title}</h1>
                <span>Asked: {convertDateTime(question.created_at)}, Modified: {convertDateTime(question.updated_at)}</span>
            </div>
            <div className='question-body'>
                <p>{question.body}</p>
            </div>
            <div className='question-answers-container'>

            </div>
            <div className='new-answer-form-container'>
                <h1>Your Answer</h1>
                <form>
                    <input/>
                </form>
            </div>
        </>
    )

}

export default QuestionShow;