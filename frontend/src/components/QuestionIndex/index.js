import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const dispatch = useDispatch();
    const [qOrder, setQOrder] = useState("score")
    const questions = useSelector(state => Object.values(state.questions));
    let arr = [...questions];

    if (qOrder === "score") {
        arr.sort((a,b)=>{
            if (a.score < b.score) return 1
            if (a.score > b.score) return -1
            return 0
        });
    } else if (qOrder === "recent") {
        arr.sort((a,b)=>{
            if (a.id < b.id) return 1
            if (a.id > b.id) return -1
            return 0
        });
    } else if (qOrder === "modified") {
        arr.sort((a,b)=>{
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            if (dateA < dateB) return 1
            if (dateA > dateB) return -1
            return 0
        });
    }

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
        setQOrder(e.target.value);
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
            {arr?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
        </div>
    )
}

export default QuestionIndex;