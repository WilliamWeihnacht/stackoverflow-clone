import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions));

    useEffect(()=>{
        dispatch(fetchAllQuestions())
    },[])

    console.log(questions)

    if (questions.length === 0) {
        return (
            <div className='question-feed'>
                <div id='header-box'>
                    <h1>Top Questions</h1>
                    <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
                </div>
                <h1 id='no-results-h1'>No Results...</h1>
            </div>
        )
    }

    questions.sort((a,b)=>{
        if (a.score < b.score) return 1
        if (a.score > b.score) return -1
        return 0
    });

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