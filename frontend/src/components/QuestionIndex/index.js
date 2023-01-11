import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions));

    questions.sort((a,b)=>{
        if (a.score < b.score) return 1
        if (a.score > b.score) return -1
        return 0
    });

    const [orderedQuestions,setOrderedQuestions] = useState(questions);
    let arr = [...questions];

    useEffect(()=>{
        dispatch(fetchAllQuestions());
    },[]);

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

    const handleOptionsChange = (e) => {
        if (e.target.value === "score") {
            arr.sort((a,b)=>{
                if (a.score < b.score) return 1
                if (a.score > b.score) return -1
                return 0
            });
        } else if (e.target.value === "recent") {
            arr.sort((a,b)=>{
                if (a.id < b.id) return 1
                if (a.id > b.id) return -1
                return 0
            });
        } else if (e.target.value === "modified") {
            arr.sort((a,b)=>{
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                if (dateA < dateB) return 1
                if (dateA > dateB) return -1
                return 0
            });
        }
        setOrderedQuestions(arr);
    }

    let qs = <></>
    if (orderedQuestions.length === 0) {
        qs = <ul>{questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}</ul>
    } else {
        qs = <ul>{orderedQuestions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}</ul>
    }

    return (
        <div className='question-feed'>
            <div id='header-box'>
                <h1>Top Questions</h1>
                <select onChange={handleOptionsChange}>
                    <option value="score">Highest Score</option>
                    <option value="recent">Newest</option>
                    <option value="modified">Last Modified</option>
                </select>
                <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
            </div>
            {qs}
        </div>
    )
}

export default QuestionIndex;