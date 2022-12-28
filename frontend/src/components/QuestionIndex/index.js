import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestions } from '../../store/questionsReducer';
import QuestionIndexItem from '../QuestionIndexItem';
import "./QuestionIndex.css";

const QuestionIndex = props => {
    const questions = useSelector(state => Object.values(state.questions));
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllQuestions())
    },[])

    console.log(questions);

    return (
        <div className='question-feed'>
            <h1>Top Questions</h1>
            <ul>
                {/* {questions.map((question, i) => (<li key={i}>{question.title}</li>))} */}
                {questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
            </ul>
        </div>
    )
}

export default QuestionIndex;