# README

[Hack Overload](https://stackoverflowclone-pk3b.onrender.com/) is a programming form where software developers and hackers can post questions and get help. Questions and answers are rated by community votes. Questions, answers, and votes can be updated and deleted. Users can also search for posts.

Hack Overload was made using a rails backend which takes data from a postgres database and serves json to a react frontend.

One of the features that I'm most proud of is the search funtionality. It is able to handle multiple keywords and look for each of them in both the title and body of each post. This feature makes use of active record quieries and associations to effeciently serve the front end relevent sorted posts in chunks of 10 for fast response time.

Another feature I like is the dynamic editing of posts. When the edit button is clicked, instead of redirecting to a edit form, the question's show page changes into a form dynamically, allowing the user to edit seamlessly.

Here's a sample of some code that runs when a use hits the upvote button. This was difficult to implement as there are 3 cases that require unique changes to the state/database. Each block sends data to the backend, updates the store, and updates the staet of the component, and changes the css of the page in a unique way. This function also handles upvotes for both questions and answers which are significantly different and require different treatment.
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
