import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUser } from "../../store/usersReducer";
import QuestionIndexItem from "../QuestionIndexItem";
import './UserShow.css';

const UserShow = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(state => state.users["user"]);
    const [questionsTab,setTab] = useState(true); //true => questions tab is active, false => answers tab is active

    useEffect(()=>{
        dispatch(fetchUser(userId));
    },[userId])

    if (!user) return <h1>User Not Found</h1>

    const questions = Object.values(user.questions);
    const answers = Object.values(user.answers);
    const userProfile = user.user;
    
    console.log(user)

    return (
        <div id="users-show-container">
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
                    <h7>{`Member since ${new Date(userProfile.createdAt).toLocaleDateString()}`}</h7>
                    <h7></h7>
                </span>
            </div>
            <ul>
                {questions?.map((question, i) => <QuestionIndexItem question={question} key={i}/>)}
            </ul>
        </div>
    )
}

export default UserShow;