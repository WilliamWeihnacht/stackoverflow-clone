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
    const questions = useSelector(state => Object.values(state.questions));
    const [headerTitle,setHeaderTitle] = useState("Top Questions");
    const [order, setOrder] = useQueryParam('order', StringParam);
    const [page,setPage] = useQueryParam('page', NumberParam);
    const [query,setQuery] = useQueryParam('query', StringParam);

    if (!page) setPage(1);

    useEffect(()=>{
        dispatch(fetchAllQuestions({page,query,order}));
        if (query && query !== "") {
            setHeaderTitle(`Results for \"${query}\"`);
        } else {
            setHeaderTitle("Top Questions");
        }
    },[page,query,order]);

    switch(order) {
        case "new":
            questions.sort((a,b)=>{
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (dateA < dateB) return 1
                if (dateA > dateB) return -1
                return 0
            });
            break;
        case "modified":
            questions.sort((a,b)=>{
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                if (dateA < dateB) return 1
                if (dateA > dateB) return -1
                return 0
            });
            break
        default:
            questions.sort((a,b)=>{
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (dateA < dateB) return 1
                if (dateA > dateB) return -1
                return 0
            });
    }

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
        setOrder(newOrder);
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
    if (page <= 1 && questions.length < 10) {
        pageButtons = <></>
    } else if (page <= 1) {
        pageButtons = <button onClick={nextPage} id='next-page-single'>Next Page</button>
    } else if (questions.length < 10) {
        pageButtons = <button onClick={prevPage} id='prev-page-single'>Previous Page</button>
    } else {
        pageButtons =(
            <>
                <button onClick={prevPage} id='prev-page'>Previous Page</button>
                <div id='page-number-div'>{page}</div>
                <button onClick={nextPage} id='next-page'>Next Page</button>
            </>
        )
    }

    return (
        <>
        <div className='question-feed'>
            <div id='header-box'>
                <h1>{headerTitle}</h1>
                <div id='header-box-controls'>
                <select onChange={handleOptionsChange}>
                    <option value="new">Newest</option>
                    <option value="modified">Last Modified</option>
                    <option value="score">Highest Score</option>
                </select>
                <NavLink to={"/questions/new"}><button>New Question</button></NavLink>
                </div>
            </div>
            {questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
        </div>
        <div id='page-buttons-div'>
            {pageButtons}
        </div>
        </>
    )
}

export default QuestionIndex;