import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createQuestionVote, deleteQuestionVote, updateQuestionVote } from '../../store/questionVotesReducer';
import './VoteButtons.css';


const VoteButtons = ({ post }) => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const userVote = useSelector(state => state.questions[questionId].userVote)
    const [upvote,setUpvote] = useState(userVote?.upvote === true ? "upvote-active" : "upvote");
    const [downvote,setDownvote] = useState(userVote?.upvote === false ? "downvote-active" : "downvote");
    const [scoreState,setScoreState] = useState(post.score);


    const handleUpvote = async (e) => {
        if (userVote && userVote.upvote === false) {
            console.log("down to up")
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: true
                }
                dispatch(updateQuestionVote(data))
            } else {
                console.log("answer down to up");
            }
            setScoreState(scoreState+2);
            setDownvote("downvote");
            setUpvote("upvote-active");
        } else if (userVote?.upvote === true) {
            console.log("up to nothing")
            if (post.title) {
                dispatch(deleteQuestionVote(userVote));
            } else {
                console.log("Delete answer vote")
            }
            setScoreState(scoreState-1);
            setUpvote("upvote");
        } else {
            console.log("nothing to up")
            let data = {
                question_id: questionId,
                upvote: true
            }
            if (post.title) {
                dispatch(createQuestionVote(data));
            } else {
                console.log("Create answer vote")
            }
            setScoreState(scoreState+1);
            setUpvote("upvote-active");
        }
    }

    const handleDownVote = async (e) => {
        if (userVote && userVote.upvote === true) {
            console.log("up to down")
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: false
                }
                dispatch(updateQuestionVote(data))
            } else {
                console.log("answer up to down");
            }
            setScoreState(scoreState-2);
            setDownvote("downvote-active");
            setUpvote("upvote");
        } else if (userVote?.upvote === false) {
            console.log("down to nothing")
            if (post.title) {
                dispatch(deleteQuestionVote(userVote));
            } else {
                console.log("Delete answer vote")
            }
            setScoreState(scoreState+1)
            setDownvote("downvote");
        } else {
            console.log("nothing to down")
            let data = {
                question_id: questionId,
                upvote: false
            }
            if (post.title) {
                dispatch(createQuestionVote(data));
            } else {
                console.log("Create answer vote")
            }
            setScoreState(scoreState-1)
            setDownvote("downvote-active");
        }
    }

    return (
        <div className="vote-buttons-container">
            <button id={upvote} onClick={handleUpvote}>1</button>
            {scoreState}
            <button id={downvote} onClick={handleDownVote}>1</button>
        </div>
    )
}

export default VoteButtons;