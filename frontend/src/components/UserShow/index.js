import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { fetchUser } from "../../store/usersReducer";
import QuestionIndexItem from "../QuestionIndexItem";
import UserAnswerIndexItem from "../UserAnswerIndexItem";
import './UserShow.css';

const UserShow = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();
    const user = useSelector(state => state.users["user"]);
    const [questionsTab,setTab] = useState(true); //true => questions tab is active, false => answers tab is active

    useEffect(()=>{
        dispatch(fetchUser(userId));
    },[userId])

    if (!user) return (
        <>
            <div id="users-show-container" className="question-feed">
            <h1 id='no-results-h1'>No Results...</h1>
            <div id='back-button-div'>
                <a onClick={()=>history.goBack()} id="back-button">Go Back</a>
            </div>
            </div>
        </>
    )

    const questions = user.questions ? Object.values(user.questions) : [];
    const answers = user.answers ? Object.values(user.answers) : [];
    const userProfile = user.user;
    
    let content;
    if (questionsTab) {
        content = questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)
    } else {
        content = answers?.map((answer, i) => <UserAnswerIndexItem answer={answer} key={i}/>)
    }

    return (
        <div id="users-show-container" className="question-feed">
            <div id="header-box">
                <div id="user-show-tab-container">
                    <h1 id="user-show-username">{userProfile.username}</h1>
                    <div id="user-show-buttons-container">
                        <button className={questionsTab ? "user-show-button-active" : "user-show-button"} id="user-show-questions-button" onClick={()=>setTab(true)}>Questions</button>
                        <button className={!questionsTab ? "user-show-button-active" : "user-show-button"} id="user-show-answers-button" onClick={()=>setTab(false)}>Answers</button>
                    </div>
                    <span id="user-posts-count">{`${questionsTab ? questions.length : answers.length} ${questionsTab ? "questions asked" : "answers given"}`}</span>
                </div>
                <span id="user-stats">
                    <h5>{`Member since ${new Date(userProfile.createdAt).toLocaleDateString()}`}</h5>
                </span>
            </div>
            <ul>
                {content}
            </ul>
        </div>
    )
}

export default UserShow;