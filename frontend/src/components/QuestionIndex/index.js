import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const questions = useSelector(state => Object.values(state.questions));
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllQuestions())
    },[])

    return (
        <div className='question-feed'>
            <div id='header-box'>
                <h1>Top Questions</h1>
                <button><NavLink to={"/questions/new"}>New Question</NavLink></button>
            </div>
            <ul>
                {questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
            </ul>
        </div>
    )
}

export default QuestionIndex;