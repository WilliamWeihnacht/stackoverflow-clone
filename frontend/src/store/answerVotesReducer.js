import csrfFetch from "./csrf";
import { RECEIVE_QUESTION, RECEIVE_QUESTIONS } from "./questionsReducer";

export const RECEIVE_ANSWER_VOTE = 'RECEIVE_ANSWER_VOTE';
export const RECEIVE_ANSWER_VOTES = 'RECEIVE_ANSWER_VOTES';
export const REMOVE_ANSWER_VOTE = 'REMOVE_ANSWER_VOTE';
export const UPDATE_ANSWER_VOTE = 'UPDATE_ANSWER_VOTE';

//thunk action creators
export const createAnswerVote = (answerVote) => async (dispatch) => {
    const res = await csrfFetch('/api/answer_votes', {
        method: 'POST',
        body: JSON.stringify(answerVote)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveAnswerVote(data))
    } else {
        console.log(res.statusText);
    }
}

export const deleteAnswerVote = (answerVote) => async (dispatch) => {
    const res = await csrfFetch(`/api/answer_votes/${answerVote.id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeAnswerVote(answerVote))
    } else {
        console.log(res.statusText);
    }
}

export const updateAnswerVote = (answerVote) => async (dispatch) => {
    const res = await csrfFetch(`/api/answer_votes/${answerVote.id}`, {
        method: 'PATCH',
        body: JSON.stringify(answerVote)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(editAnswerVote(data));
    } else {
        console.log(res.statusText);
    }
}

//action creators
export const receiveAnswerVote = payload => ({
    type: RECEIVE_ANSWER_VOTE,
    payload
});

export const removeAnswerVote = answerVote => ({
    type: REMOVE_ANSWER_VOTE,
    answerVote
});

export const editAnswerVote = answerVote => ({
    type: UPDATE_ANSWER_VOTE,
    answerVote
});

//reducer
const answerVoteReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch (action.type) {
        // case RECEIVE_ANSWER_VOTE:
        //     nextState[action.payload.id] = action.payload;
        //     return nextState
        // case RECEIVE_ANSWER_VOTES:
        //     return {...nextState, ...action.questions}
        // case REMOVE_ANSWER_VOTE:
        //     delete nextState[action.answerVote.id];
        //     return nextState;
        // case UPDATE_ANSWER_VOTE:
        //     //todo
        //     return nextState;
        // case RECEIVE_QUESTION:
        //     return {...action.payload.answerVotes};
        // case RECEIVE_QUESTIONS:
        //     return {}
        // default:
        //     return state;
    };
};
  
export default answerVoteReducer;