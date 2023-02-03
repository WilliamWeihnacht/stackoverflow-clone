import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createAnswerVote, deleteAnswerVote, updateAnswerVote } from '../../store/answerVotesReducer';
import { createQuestionVote, deleteQuestionVote, updateQuestionVote } from '../../store/questionVotesReducer';
import './VoteButtons.css';


const VoteButtons = ({ post }) => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    // const userVote = useSelector(state => state.questions[questionId].userVote)
    const sessionUser = useSelector(state => state.session.user);
    const userVote = post.userVote;
    const [upvote,setUpvote] = useState(userVote?.upvote === true ? "upvote-active" : "upvote");
    const [downvote,setDownvote] = useState(userVote?.upvote === false ? "downvote-active" : "downvote");
    const [scoreState,setScoreState] = useState(post.score || 0);


    const handleUpvote = async (e) => {
        if (!sessionUser) return;
        if (userVote && userVote.upvote === false) {
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: true
                }
                dispatch(updateQuestionVote(data))
            } else {
                const data = {
                    answer_id: post.id,
                    upvote: true
                }
                dispatch(updateAnswerVote(data))
            }
            setScoreState(scoreState+2);
            setDownvote("downvote");
            setUpvote("upvote-active");
        } else if (userVote?.upvote === true) {
            if (post.title) {
                dispatch(deleteQuestionVote(userVote));
            } else {
                dispatch(deleteAnswerVote(userVote));
            }
            setScoreState(scoreState-1);
            setUpvote("upvote");
        } else {
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: true
                }
                dispatch(createQuestionVote(data));
            } else {
                const data = {
                    answer_id: post.id,
                    upvote: true
                }
                dispatch(createAnswerVote(data));
            }
            setScoreState(scoreState+1);
            setUpvote("upvote-active");
        }
    }

    const handleDownVote = async (e) => {
        if (!sessionUser) return;
        if (userVote && userVote.upvote === true) {
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: false
                }
                dispatch(updateQuestionVote(data));
            } else {
                const data = {
                    answer_id: post.id,
                    upvote: false
                }
                dispatch(updateAnswerVote(data));
            }
            setScoreState(scoreState-2);
            setDownvote("downvote-active");
            setUpvote("upvote");
        } else if (userVote?.upvote === false) {
            if (post.title) {
                dispatch(deleteQuestionVote(userVote));
            } else {
                dispatch(deleteAnswerVote(userVote));
            }
            setScoreState(scoreState+1)
            setDownvote("downvote");
        } else {
            if (post.title) {
                const data = {
                    question_id: questionId,
                    upvote: false
                }
                dispatch(createQuestionVote(data));
            } else {
                const data = {
                    answer_id: post.id,
                    upvote: false,
                }
                dispatch(createAnswerVote(data));
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