import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuestionVote } from '../../store/questionVotesReducer';
import './VoteButtons.css';


const VoteButtons = ({ post }) => {
    const dispatch = useDispatch();
    const [upvote,setUpvote] = useState("upvote");
    const [downvote,setDownvote] = useState("downvote");

    useEffect(() => {
        if (post.vote && post.vote[0]) {
            if (post.vote[0].upvote) {
                setUpvote("upvote-active");
            } else {
                setDownvote("downvote-active");
            }
        }
    })

    const handleUpvote = async (e) => {
        if (downvote === "downvote-active" || upvote === "upvote-active") return;
        let data = {
            question_id: post.id,
            upvote: true
        }
        dispatch(createQuestionVote(data));
        setUpvote("upvote-active");
    }

    const handleDownVote = async (e) => {
        if (upvote === "upvote-active" || downvote === "downvote-active") return;
        let data = {
            question_id: post.id,
            upvote: false
        }
        dispatch(createQuestionVote(data));
        setDownvote("downvote-active");
    }

    return (
        <div className="vote-buttons-container">
            <button id={upvote} onClick={handleUpvote}>1</button>
            {post.score || 0}
            <button id={downvote} onClick={handleDownVote}>1</button>
        </div>
    )
}

export default VoteButtons;