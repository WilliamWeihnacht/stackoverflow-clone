import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(()=>{
        dispatch(fetchAllQuestions())
    },[dispatch])

    if (!sessionUser) return <Redirect to={"/splash"}/>;

    return (
        <div className='question-feed'>
            <div id='header-box'>
                <h1>Top Questions</h1>
                <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
            </div>
            <ul>
                {questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
            </ul>
        </div>
    )
}

export default QuestionIndex;