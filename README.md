# README

[Hack Overload](https://stackoverflowclone-pk3b.onrender.com/) is a programming form where software developers and hackers can post questions and get help. Questions and answers are rated by community votes. Questions, answers, and votes can be updated and deleted. Users can also search for posts.

Hack Overload was made using a rails backend which takes data from a postgres database and serves json to a react frontend.

```
const handleUpvote = async (e) => {
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
    ```
