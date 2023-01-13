import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [order, setOrder] = useQueryParam('query', StringParam);
    const [page,setPage] = useQueryParam('page', NumberParam);
    const [query,setQuery] = useQueryParam('query', StringParam);
    const questions = useSelector(state => Object.values(state.questions));

    useEffect(()=>{
        dispatch(fetchAllQuestions({page,query,order}));
    },[page,query]);

    if (questions.length === 0) {
        return (
            <div className='question-feed'>
                <div id='header-box'>
                    <h1>Top Questions</h1>
                    <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
                </div>
                <h1 id='no-results-h1'>No Results...</h1>
                <div id='back-button-div'>
                    <a onClick={()=>history.goBack()} id="back-button">Go Back</a>
                </div>
            </div>
        )
    }

    const handleOptionsChange = (e) => {
        const newOrder = e.target.value || "new";
        setOrder(e.target.value);
    }

    const nextPage = (e) => {
        const nextPageNum = page + 1 || 2;
        setPage(nextPageNum);
    }

    const prevPage = (e) => {
        const nextPageNum = page - 1 || 1;
        if (nextPage < 1) nextPageNum = 1;
        setPage(nextPageNum);
    }

    let pageButtons;
    if (page <= 1) {
        pageButtons = <button onClick={nextPage}>Next Page</button>
    } else if (questions.length < 10) {
        pageButtons = <button onClick={prevPage}>Last Page</button>
    } else {
        pageButtons =(
            <>
                <button onClick={prevPage}>Last Page</button>
                <button onClick={nextPage}>Next Page</button>
            </>
        )
    }

    return (
        <>
        <div className='question-feed'>
            <div id='header-box'>
                <h1>Top Questions</h1>
                <div id='header-box-controls'>
                <select onChange={handleOptionsChange}>
                    <option value="new">Newest</option>
                    <option value="score">Highest Score</option>
                    <option value="modified">Last Modified</option>
                </select>
                <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
                </div>
            </div>
            {questions?.reverse().map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
        </div>
        <div id='page-buttons-div'>
            {pageButtons}
        </div>
        </>
    )
}

export default QuestionIndex;